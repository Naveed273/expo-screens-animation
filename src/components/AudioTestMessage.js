import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
export default function AudioTestMessage() {
  const [recording, setRecording] = useState(null);
  const [isRecording, setisRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [positionMillis, setpositionMillis] = useState(0);
  const [record, setRecord] = useState(null);
  const [sound, setSound] = React.useState(null);
  const [soundStatus, setSoundStatus] = useState({
    status: null,
    icon: "playcircleo",
  });
  async function startRecording() {
    setisRecording(true);
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
      setisRecording(false);
    }
  }
  const handleAudio = async (recording) => {
    console.log({ naveedRecording: recording });
    if (soundStatus.status === null) {
      // console.log("Loading Sound");
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: recording.file,
        },
        { shouldPlay: true },
        (status) => {
          setpositionMillis(getDurationFormatted(status.positionMillis));
          // console.log({ firstStatus: status });
        }
      );

      setSound(sound);
      setSoundStatus({ status: status, icon: "pausecircleo" });
    }

    //pause audio
    if (soundStatus.status) {
      if (soundStatus.status.isLoaded && soundStatus.status.isPlaying) {
        const status = await sound.pauseAsync();
        // console.log("pausingStatus", { ...status });
        setSoundStatus({ status: status, icon: "playcircleo" });
      }

      //resuming audio
      if (soundStatus.status.isLoaded && !soundStatus.status.isPlaying) {
        const status = await sound.replayAsync();
        // console.log("resumingStatus", { ...status });
        setSoundStatus({ status: status, icon: "playcircleo" });
      }
    }
  };
  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    // console.log("Recording stopped and stored at", uri);
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: uri,
    });
    setRecording({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: uri,
    });
    setRecord({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: uri,
    });
    setRecordings(updatedRecordings);
    setisRecording(false);
  }
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }
  function getRecordingLines() {
    return (
      record && (
        <View style={styles.row}>
          <AntDesign
            onPress={() => recording.sound.replayAsync()}
            // onPress={() => handleAudio(record)}
            name={soundStatus.icon}
            size={30}
            color="orange"
          />
          <Text style={styles.fill}>
            Recording {1} - {recording?.duration}-{positionMillis}
          </Text>
        </View>
      )
    );
    // return recordings.map((recordingLine, index) => {
    //   // console.log({ recordingLine });
    //   return (
    //     <View key={index} style={styles.row}>
    //       <AntDesign
    //         // onPress={() => recordingLine.sound.replayAsync()}
    //         onPress={() => handleAudio(recordingLine)}
    //         name={soundStatus.icon}
    //         size={30}
    //         color="orange"
    //       />
    //       <Text style={styles.fill}>
    //         Recording {index + 1} - {recordingLine.duration}-{positionMillis}
    //       </Text>
    //     </View>
    //   );
    // });
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {getRecordingLines()}
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
        <FontAwesome5
          name={"microphone-alt"}
          size={24}
          color={isRecording ? "red" : "black"}
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
    marginLeft: 10,
  },
  button: {
    margin: 0,
  },
});
