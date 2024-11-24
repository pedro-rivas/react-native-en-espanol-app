import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Explore() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink",
      }}
    >
      <Text style={{ fontSize: 30 }}>Explore</Text>
      <Link href={'/(tabs)/(explore)/search/tacos'}>Search for "tacos"</Link>
      <Link href={'/(tabs)/(explore)/search/taxis'}>Search for "taxis"</Link>
    </View>
  );
}
