import React from "react";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import IntroScreen from "../screens/Intro";
import Theme from "./theme";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { colors } = useTheme();

  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator initialRouteName="IntroScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Travel the world",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => {
              return null;
            },
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false, headerLeft: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
