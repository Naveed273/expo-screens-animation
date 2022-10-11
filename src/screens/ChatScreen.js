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
import moment from "moment";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default ChatScreen = () => {
  const [message, setMessage] = useState("");

  const [allPrevMessages, setAllPrevMessages] = useState([
    {
      body: "Yes",
      chat_id: 380,
      id: "0307c38f-c602-40cb-8288-b378dc0313df",
      sender_id: 483,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "Wor",
      chat_id: 380,
      id: "483ff727-8da3-4bb3-acc4-3baea24dbea7",
      sender_id: 483,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "It is really working",
      chat_id: 380,
      id: "4d8efce1-18d3-4a51-a128-a38f6a2f41f2",
      sender_id: 483,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "It is wonderful",
      chat_id: 380,
      id: "a78df43d-74fb-4f04-abd2-ddb110d3c35d",
      sender_id: 483,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "Like a pro",
      chat_id: 380,
      id: "490d9026-f103-46ae-b4eb-ad0e8cb93f36",
      sender_id: 483,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "Why you are not replying",
      chat_id: 380,
      id: "548a0b87-cbc4-49b1-b943-745ad914d1fd",
      sender_id: 483,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      body: "Please reply",
      chat_id: 380,
      id: "be948cf7-f806-48fd-b5bd-334c2fa40918",
      sender_id: 483,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

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
        <View style={{ padding: 20 }}>
          {allPrevMessages?.length > 0 &&
            allPrevMessages.map((item, index) => {
              // For easier uniqueness check,Formated date string example '16082021'
              const dateNum = moment(item.created_at).format("ddMMyyyy");

              if (item.sender_id !== 2) {
                return (
                  <View style={styles.myChatView}>
                    {dates.has(dateNum) ? null : renderDate(item, dateNum)}
                    <View style={styles.myChat}>
                      <Text style={styles.myChatText}>{item.body}</Text>
                      <Text style={styles.myTimeText}>
                        {moment(item.created_at).format("h:mm a")}
                      </Text>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={styles.senderChatView}>
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
                          margin: 15,
                          borderRadius: 20,
                          borderTopRightRadius: 0,
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFFFFF",
                            fontWeight: "400",
                            fontSize: 15.5,
                          }}
                        >
                          {item.body}
                        </Text>
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
        <View style={styles.fo} />

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
              width: "100%",
              minHeight: 50,
              fontSize: 19,
              fontWeight: "400",
              color: "black",
              paddingTop: 16,
              paddingBottom: 12,
            }}
          />

          <TouchableOpacity
            style={styles.sendIcon}
            onPress={() => sendMessage()}
          >
            <Ionicons name={"send"} size={24} color={"black"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.audioIcon}>
          <FontAwesome5 name={"microphone-alt"} size={24} color={"black"} />
        </TouchableOpacity>
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
    color: "black",
    marginRight: 5,
  },
  greenDot: {
    height: 8,
    width: 8,
    marginLeft: 5,
    backgroundColor: "#62CEAA",
    borderRadius: 20,
  },
  positionTextView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  positionText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
    marginHorizontal: 5,
  },
  dateText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#A8A8AF",
    textAlign: "center",
    width: "100%",
  },
  tamplateIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
  },
  callIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  messageBody: {
    flex: 1,
  },
  senderChatView: {
    alignItems: "flex-end",
  },
  senderChat: {
    backgroundColor: "black",
    maxWidth: 275,
    paddingHorizontal: 15,
    paddingVertical: 15,
    margin: 15,
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
  },
  myChat: {
    backgroundColor: "#EEEEEE",
    maxWidth: 275,
    paddingHorizontal: 18,
    paddingVertical: 15,
    margin: 15,
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
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 118,
    maxHeight: "auto",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.85,
    // shadowRadius: 20,
    // elevation: 2,
    // shadowColor: '#C2C2C2',
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: "#e4e4e4",
  },
  plusButton: {
    marginHorizontal: 10,
  },
  messageInputContainer: {
    paddingLeft: 10,
    marginLeft: 15,
    paddingRight: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 10,
    height: "auto",
    marginTop: 10,
    width: 350,
  },
  sendIcon: {
    position: "absolute",
    backgroundColor: "transparent",
    paddingLeft: 50,
    marginLeft: 250,
  },
  shareContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: 40,
    marginHorizontal: 110,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shareIcons1: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 1000,
    backgroundColor: "#4e30a8",
  },
  shareIcons2: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 1000,
    backgroundColor: "#a43b3b",
  },
  shareIcons3: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 1000,
    backgroundColor: "#8d4b9a",
  },
  shareIcons4: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 1000,
    backgroundColor: "#FFA500",
  },
  shareIcons5: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 1000,
    backgroundColor: "#489464",
  },
  shareIcons6: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 1000,
    backgroundColor: "#115ece",
  },
  iconsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1B1B1B",
  },
});
