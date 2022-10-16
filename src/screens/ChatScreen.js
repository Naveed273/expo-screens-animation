import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import uuid from "react-native-uuid";
import { useIsFocused } from "@react-navigation/native";
import moment, { duration } from "moment";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Audio } from "expo-av";
export default ChatScreen = () => {
  const [message, setMessage] = useState("");

  const [allPrevMessages, setAllPrevMessages] = useState([
    {
      body: "Yes",
      chat_id: 380,
      id: "0307c38f-c602-40cb-8288-b378dc0313df",
      sender_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "Wor",
      chat_id: 380,
      id: "483ff727-8da3-4bb3-acc4-3baea24dbea7",
      sender_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "It is really working",
      chat_id: 380,
      id: "4d8efce1-18d3-4a51-a128-a38f6a2f41f2",
      sender_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "It is wonderful",
      chat_id: 380,
      id: "a78df43d-74fb-4f04-abd2-ddb110d3c35d",
      sender_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "Like a pro",
      chat_id: 380,
      id: "490d9026-f103-46ae-b4eb-ad0e8cb93f36",
      sender_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "Why you are not replying",
      chat_id: 380,
      id: "548a0b87-cbc4-49b1-b943-745ad914d1fd",
      sender_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "Please reply",
      chat_id: 380,
      id: "be948cf7-f806-48fd-b5bd-334c2fa40918",
      sender_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      chat_id: 2,
      created_at: "2022-10-14T09:32:40.125Z",
      duration: "0:01",
      file: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540naveedinfosun%252Fshared-elemen-transitions/Audio/recording-6803de92-a93e-4798-a445-325f83cf951a.m4a",
      id: "e7312f5b-fd6d-4164-b61a-da61bd5c2139",
      messageType: "audio",
      sender_id: 1,
      sound: { _coalesceStatusUpdatesInMillis: 100 },
      updated_at: "2022-10-14T09:32:40.125Z",
    },
    {
      chat_id: 2,
      created_at: "2022-10-14T09:32:40.125Z",
      duration: "0:01",
      file: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540naveedinfosun%252Fshared-elemen-transitions/Audio/recording-6803de92-a93e-4798-a445-325f83cf951a.m4a",
      id: "e7312f5b-fd6d-4164-b61a-da61bd5c2139",
      messageType: "audio",
      sender_id: 2,
      sound: { _coalesceStatusUpdatesInMillis: 100 },
      updated_at: "2022-10-14T09:32:40.125Z",
    },
  ]);
  const [recording, setRecording] = useState(null);
  const [isRecording, setisRecording] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [positionMillis, setpositionMillis] = useState(0);
  const [recordingMillis, setrecordingMillis] = useState(null);
  // const [, set] = useState(second)
  const [sound, setSound] = React.useState(null);
  const [currentIndex, setcurrentIndex] = useState(null);
  const [soundStatus, setSoundStatus] = useState({
    status: null,
  });
  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording, status } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        (status) => {
          setisRecording(status.isRecording);
          setrecordingMillis(getDurationFormatted(status.durationMillis));
        }
      );

      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }
  const handleAudio = async (recording, index) => {
    if (soundStatus.status === null) {
      console.log("Loading Sound");
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: recording.file,
        },
        { shouldPlay: true },
        async (status) => {
          setcurrentIndex(index);
          if (status.isLoaded && status.isPlaying) {
            setpositionMillis(getDurationFormatted(status.positionMillis));
            setisPlaying(true);
          } else {
            setisPlaying(false);
          }
          if (status.positionMillis === status.durationMillis) {
            setSoundStatus({ status: null });
            setpositionMillis(null);
          }
        }
      );

      setSound(sound);
      setSoundStatus({ status: status });
    }

    //pause audio
    if (soundStatus.status) {
      if (soundStatus.status.isLoaded && soundStatus.status.isPlaying) {
        const status = await sound.pauseAsync();
        console.log("pausingStatus", { ...status });
        setSoundStatus({ status: status });
      }

      //resuming audio
      if (
        soundStatus.status.isLoaded &&
        !soundStatus.status.isPlaying &&
        !soundStatus.status.shouldPlay
      ) {
        const status = await sound.playAsync();

        console.log("resumingStatus", { ...status });
        setSoundStatus({ status: status });
      }
      // replaying audio
      if (!soundStatus.status.isLoaded && !soundStatus.status.isPlaying) {
        const status = await sound.replayAsync();
        console.log("replayingStatus", { ...status });
        setSoundStatus({ status: status });
      }
    }
  };
  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    setrecordingMillis(null);
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
    // setRecord({
    //   sound: sound,
    //   duration: getDurationFormatted(status.durationMillis),
    //   file: uri,
    // });
    setRecordings(updatedRecordings);
    setAllPrevMessages([
      ...allPrevMessages,
      {
        id: uuid.v4(),
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: uri,
        sender_id: 1,
        chat_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        messageType: "audio",
      },
    ]);
  }
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  const scrollViewRef = useRef();

  const dates = new Set();

  const sendMessage = () => {
    if (message.trim()?.length === 0) {
      return false;
    }
    setAllPrevMessages([
      ...allPrevMessages,
      {
        id: uuid.v4(),
        body: message.trim(),
        sender_id: 1,
        chat_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        messageType: "text",
      },
    ]);

    setMessage("");
  };

  const renderDate = (chat, dateNum) => {
    // const timestampDate = format(chat.timestamp, 'EEEE, dd/MM/yyyy')
    const timestampDate = moment(chat.created_at).format("D MMM YYYY");

    // Add to Set so it does not render again
    dates.add(dateNum);

    return <Text style={styles.dateText}>{timestampDate.toUpperCase()}</Text>;
  };
  return (
    <SafeAreaView style={styles.containerStyle}>
      <StatusBar backgroundColor="black" barStyle="default" />
      <View style={styles.headerView}>
        <View style={styles.backButtonView}>
          <AntDesign name="arrowleft" size={20} />
        </View>
        <View
          style={{
            height: 50,
            width: 50,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#EAEAEA",
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <Ionicons name={"person-outline"} size={25} color={"black"} />
        </View>
        <View style={styles.headerTitleView}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>Umar</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.messageBody}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <View style={{ paddingHorizontal: 5, paddingVertical: 20 }}>
          {allPrevMessages?.length > 0 &&
            allPrevMessages.map((item, index) => {
              // console.log({ item });
              // For easier uniqueness check,Formated date string example '16082021'
              const dateNum = moment(item.created_at).format("ddMMyyyy");

              if (item.sender_id !== 1) {
                return (
                  <View style={styles.myChatView} key={index}>
                    {dates.has(dateNum) ? null : renderDate(item, dateNum)}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View style={styles.myChat}>
                        {item.messageType === "audio" ? (
                          <View style={styles.row}>
                            <AntDesign
                              // onPress={() => item.sound.replayAsync()}
                              onPress={() => handleAudio(recording, index)}
                              name={
                                currentIndex === index
                                  ? isPlaying
                                    ? "pausecircleo"
                                    : "playcircleo"
                                  : "playcircleo"
                              }
                              size={30}
                              color="orange"
                            />
                            <Text style={styles.fill}>
                              Recording -
                              {currentIndex === index && positionMillis
                                ? positionMillis
                                : item?.duration}
                            </Text>
                          </View>
                        ) : (
                          <Text style={styles.myChatText}>{item.body}</Text>
                        )}

                        <Text style={styles.myTimeText}>
                          {moment(item.created_at).format("h:mm a")}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={styles.senderChatView} key={index}>
                    {dates.has(dateNum) ? null : renderDate(item, dateNum)}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "black",
                          maxWidth: 275,
                          paddingHorizontal: 15,
                          paddingVertical: 15,
                          marginHorizontal: 15,
                          borderRadius: 20,
                          borderTopRightRadius: 0,
                        }}
                      >
                        {item.messageType === "audio" ? (
                          <View style={styles.row}>
                            <AntDesign
                              // onPress={() => item.sound.replayAsync()}
                              onPress={() => handleAudio(recording, index)}
                              name={
                                currentIndex === index
                                  ? isPlaying
                                    ? "pausecircleo"
                                    : "playcircleo"
                                  : "playcircleo"
                              }
                              size={30}
                              color="orange"
                            />
                            <Text style={styles.fill}>
                              Recording -
                              {currentIndex === index && positionMillis
                                ? positionMillis
                                : item?.duration}
                            </Text>
                          </View>
                        ) : (
                          <Text
                            style={{
                              color: "#FFFFFF",
                              fontWeight: "400",
                              fontSize: 15.5,
                            }}
                          >
                            {item.body}
                          </Text>
                        )}

                        <Text style={styles.senderTimeText}>
                          {moment(item.created_at).format("h:mm a")}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }
            })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View
          style={{
            ...styles.messageInputContainer,
          }}
        >
          <TextInput
            autoFocus={true}
            value={message}
            onChangeText={(text) => setMessage(text)}
            autoCorrect={true}
            placeholder={"Type a message..."}
            placeholderTextColor={"#A8A8AF"}
            textAlignVertical={"center"}
            multiline={true}
            style={{
              //   width: "80%",
              minHeight: 50,
              fontSize: 19,
              fontWeight: "400",
              color: "black",
              paddingTop: 16,
              paddingBottom: 12,
              flex: 1,
            }}
          />

          <TouchableOpacity
            style={styles.sendIcon}
            onPress={() => sendMessage()}
          >
            <Ionicons name={"send"} size={24} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.audioIcon}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <FontAwesome5
              name={"microphone-alt"}
              size={24}
              color={isRecording ? "red" : "black"}
            />
            {recordingMillis && (
              <Text style={{ color: "red" }}>{recordingMillis}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  backButtonView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    flex: 0.4,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTitleView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
    marginRight: 5,
  },
  dateText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#A8A8AF",
    textAlign: "center",
    width: "100%",
  },

  messageBody: {
    flex: 1,
  },
  senderChatView: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
  senderChat: {
    backgroundColor: "black",
    maxWidth: 275,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 20,
    borderTopRightRadius: 0,
  },
  senderChatText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 15.5,
  },
  senderTimeText: {
    textAlign: "right",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 10,
  },
  myChatView: {
    alignItems: "flex-start",
    marginVertical: 10,
  },
  myChat: {
    backgroundColor: "#EEEEEE",
    maxWidth: 275,
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 20,
    borderTopLeftRadius: 0,
  },
  myChatText: {
    color: "black",
    fontWeight: "400",
    fontSize: 15.5,
  },
  myTimeText: {
    textAlign: "right",
    color: "black",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 10,
  },
  audioIcon: {
    alignItems: "center",
    // flex: 0.12,
    marginLeft: 5,
    // justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 80,
    maxHeight: "auto",
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: "#e4e4e4",
  },

  messageInputContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 10,
    height: "auto",
    marginTop: 10,
    flex: 1,
  },
  sendIcon: {
    flex: 0.2,
    alignItems: "flex-end",
  },

  iconsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1B1B1B",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: 250,
  },
  fill: {
    flex: 1,
    marginLeft: 10,
    color: "orange",
  },
  button: {
    margin: 0,
  },
});
