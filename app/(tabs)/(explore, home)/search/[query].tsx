import React from "react";
import { View, Text } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";

export default function Search() {
  const [query] = useSearchParams();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
      }}
    >
      <Text style={{ fontSize: 30 }}>Search query: {query[1]}</Text>
    </View>
  );
}
