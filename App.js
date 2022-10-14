import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Message from "./src/components/Message";
import Posts from "./src/components/Posts";
import RootNavigator from "./src/navigation/RootNavigator";
import AudioMessage from "./src/components/AudioMessage";
import AudioTestMessage from "./src/components/AudioTestMessage";

const App = () => {
  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
