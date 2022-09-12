import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import myAxios from "../config/axiosInterceptor";

export default function ListScreen(props) {
  const [list, setlist] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await myAxios.get("");
      setlist(response.data);
    } catch (e) {
      console.log({ e });
    }
  };

  const listRenderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => props.navigation.navigate("HomeScreen")}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Text style={{ color: "black", flex: 1 }}>{item.name}</Text>
          <Image
            source={{ uri: item.image_link }}
            style={{ width: 50, height: 50 }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    ),
    []
  );
  const listKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item.id}`,
    []
  );
  const listItemSeparator = useCallback(
    () => (
      <View style={{ height: 0.1, borderTopWidth: 0.5, borderColor: "gray" }} />
    ),
    []
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "black", fontSize: 18, textAlign: "center" }}>
        Makeup products list
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={listRenderItem}
        keyExtractor={listKeyExtractor}
        ItemSeparatorComponent={listItemSeparator}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});
