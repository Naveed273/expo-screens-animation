import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
export default function AudioMessage() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [sound, setSound] = React.useState(null);
  const [soundStatus, setSoundStatus] = React.useState({
    status: null,
    icon: "playcircleo",
  });
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }
  const handleAudio = async (recording) => {
    if (soundStatus.status === null) {
      console.log("Loading Sound");
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: recording.file,
        },
        { shouldPlay: true },
        (status) => console.log("wow", { ...status })
      );

      setSound(sound);
      setSoundStatus({ status: status, icon: "pausecircleo" });
    }

    //pause audio
    if (soundStatus.status) {
      if (soundStatus.status.isLoaded && soundStatus.status.isPlaying) {
        const status = await sound.pauseAsync();
        console.log("pausing audio");
        setSoundStatus({ status: status, icon: "playcircleo" });
      }

      //resuming audio
      if (soundStatus.status.isLoaded && !soundStatus.status.isPlaying) {
        const status = await sound.replayAsync();
        console.log("resuming audio");
        setSoundStatus({ status: status, icon: "playcircleo" });
      }
    }
  };
  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      // console.log({ recordingLine });
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording {index + 1} - {recordingLine.duration}
          </Text>

          <AntDesign
            style={styles.button}
            // onPress={() => recordingLine.sound.replayAsync()}
            onPress={() => handleAudio(recordingLine)}
            name={soundStatus.icon}
            size={30}
            color="black"
          />
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      {getRecordingLines()}
      <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
        <FontAwesome5
          name={"microphone-alt"}
          size={24}
          color={recording ? "red" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
});
