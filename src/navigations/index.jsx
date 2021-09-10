import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import HomeScreen from "../screens/Home";
import IntroScreen from "../screens/Intro";
import LoginScreen from "../screens/Login";
import Splash from "../screens/Splash";
import Theme from "./theme";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  // initiated all states
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [logout, setLogout] = useState(false);
  const loginData = useSelector((state) => state.login);

  /**
   * check if user is already signed and watch for login and logout actions
   */
  useEffect(() => {
    async function authData() {
      try {
        const value = await AsyncStorage.getItem("login_key");
        setLoading(false);
        if (value !== null) {
          setValid(true);
        }
      } catch (e) {
        setLoading(false);
      }
    }
    authData();
  }, [loginData.login_data, logout]);

  /**
   * remove token
   */
  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("login_key");
      setValid(false);
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) {
    return <Splash />;
  } else {
    return valid ? (
      <NavigationContainer theme={Theme}>
        <Stack.Navigator initialRouteName="HomeScreen">
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
              headerRight: () =>
                logoutLoading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Icon
                    onPress={() => handleLogout()}
                    name="logout"
                    size={30}
                    color="white"
                  />
                ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer theme={Theme}>
        <Stack.Navigator initialRouteName="IntroScreen">
          <>
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
          </>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
