import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { initializeApp } from "firebase/app";
export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBokhdZHgkeGTKE7u0a8av49GirjGM4NC8",
    authDomain: "push-notifications-c03cc.firebaseapp.com",
    projectId: "push-notifications-c03cc",
    storageBucket: "push-notifications-c03cc.appspot.com",
    messagingSenderId: "519165717200",
    appId: "1:519165717200:web:f0a5d90d06459ecc658cd5",
  };
  initializeApp(firebaseConfig);
  return <RootNavigator />;
}
