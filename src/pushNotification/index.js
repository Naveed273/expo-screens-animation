import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default async () => {
  let previousToken = await AsyncStorage.getItem("pushtoken");
  if (previousToken) {
    return;
  } else {
    Notifications.getP;
  }
};

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    // console.log('Connection type', state.type);
    // console.log('Is connected?', state.isConnected);
    if (!state.isConnected) {
      console.log(
        AppName +
          " requires active internet connection, please check your internet settings"
      );
    }
    try {
      registerForPushNotificationsAsync();
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response, "what response");
        });
    } catch (error) {
      console.log({ error });
    }
  });

  return () => {
    unsubscribe();
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);
