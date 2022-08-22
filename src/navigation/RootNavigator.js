import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import QrcodeScanner from "../screens/QrcodeScanner";
import NotificationScreen from "../screens/NotificationScreen";
const Stack = createSharedElementStackNavigator();

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="QrcodeScreen" component={QrcodeScanner} />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
