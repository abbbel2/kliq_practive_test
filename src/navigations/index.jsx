import React, { useState, useEffect } from "react";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import IntroScreen from "../screens/Intro";
import Theme from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "../screens/Splash";
import { Button, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [logout, setLogout] = useState(false);
  const loginData = useSelector((state) => state.login);

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
