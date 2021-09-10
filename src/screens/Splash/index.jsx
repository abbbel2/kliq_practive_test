import React from "react";
import { useTheme } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";

/**
 * This page is shown while checking for token
 * or if the user has already registered
 */
export default function Splash() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
