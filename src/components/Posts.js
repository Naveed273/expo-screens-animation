import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/posts";

const Posts = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);
  const { list } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts({ limit: 25 }));
  }, [dispatch]);
  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          textAlign: "center",
          color: "green",
          fontSize: 20,
          marginVertical: 10,
        }}
      >
        User posts fetched from api
      </Text>
      <Button
        title={"Reload"}
        onPress={() => dispatch(getPosts({ limit: 25 }))}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <View style={styles.container} key={item.id}>
            <View style={styles.dataContainer}>
              <Text>{item.item.id}. </Text>
              <Text>{item.item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  loader: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  dataContainer: {
    flexDirection: "row",
  },
});
