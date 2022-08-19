import React from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";

import { data } from "../config/data";

const { width } = Dimensions.get("screen");

const ITEM_WIDTH = width * 0.99;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
      {/* Header */}

      {/* Scrollable content */}
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={{ alignItems: "center" }}
        >
          {data.map((item) => (
            <View key={item.id}>
              <Pressable
                activeOpacity={0.8}
                style={{ marginBottom: 14 }}
                onPress={() => navigation.navigate("DetailScreen", { item })}
              >
                <SharedElement id={`item.${item.id}.image_url`}>
                  <Image
                    style={{
                      borderRadius: 14,
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                    }}
                    source={{ uri: item.image_url }}
                    resizeMode="cover"
                  />
                </SharedElement>
                <View
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 10,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <SharedElement id={`item.${item.id}.iconName`}>
                      <SimpleLineIcons
                        size={40}
                        color="white"
                        name={item.iconName}
                      />
                    </SharedElement>
                    <View style={{ flexDirection: "column", paddingLeft: 6 }}>
                      <SharedElement id={`item.${item.id}.title`}>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 24,
                            fontWeight: "bold",
                            lineHeight: 28,
                          }}
                        >
                          {item.title}
                        </Text>
                      </SharedElement>
                      <SharedElement id={`item.${item.id}.description`}>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                            lineHeight: 18,
                          }}
                        >
                          {item.description}
                        </Text>
                      </SharedElement>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}