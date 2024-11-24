import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
      }}
    >
      <Text style={{ fontSize: 30 }}>Home</Text>
      <Link href={'/(tabs)/(home)/search/pizza'}>Search for "pizza"</Link>
    </View>
  );
}
