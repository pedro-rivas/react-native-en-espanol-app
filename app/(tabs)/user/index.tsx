import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function User() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "orange",
      }}
    >
      <Text style={{ fontSize: 30 }}>User</Text>
      <Link href={'/(tabs)/user/edit-user'}>
        go to EditUser
        </Link>
    </View>
  );
}
