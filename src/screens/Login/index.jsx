import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth/login.action";
import { LoginValidationSchema } from "../../utilities/validation";

export default function LoginScreen() {
  const { height, width } = Dimensions.get("window");
  const { colors } = useTheme();
  const loginData = useSelector((state) => state.login);
  const dispatch = useDispatch();

  async function handleLogin(token) {
    try {
      await AsyncStorage.setItem("login_key", token);
    } catch (e) {
      console.log(e);
    }
  }

  if (loginData.login_data) {
    if (loginData.login_data.success) {
      handleLogin(loginData.login_data.data.access_token);
    } else if (loginData.login_data.success === false) {
      Alert.alert("Error occured", "User credential not correct", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../../assets/login_back.jpg")}
        style={{ height: height / 2.5 }}
      >
        <View style={styles.loginSection}>
          <Icon name="lock" color="#ffffff" size={50} />
          <Text style={styles.loginText}>Login</Text>
        </View>
      </ImageBackground>

      <View style={styles.formView}>
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => login(values, dispatch)}
        >
          {(props) => {
            const { values, handleSubmit, handleChange, errors } = props;
            return (
              // <Form>
              <View style={{ padding: 20 }}>
                <Text style={{ color: colors.primary, fontSize: 20 }}>
                  Welcome Back,
                </Text>
                <View style={{ marginTop: height / 15 }}>
                  <Input
                    name="userName"
                    placeholder="User name"
                    rightIcon={{ name: "person", color: colors.primary }}
                    label="User name"
                    value={values.userName}
                    onChangeText={handleChange("userName")}
                    errorMessage={errors.userName}
                  />
                  <Input
                    name="password"
                    placeholder="Password"
                    rightIcon={{ name: "lock", color: colors.primary }}
                    label="Password"
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    errorMessage={errors.password}
                  />
                </View>
                <View style={{ marginTop: height / 18 }}>
                  <Button
                    title="Login"
                    loading={loginData.loading}
                    buttonStyle={{ backgroundColor: colors.primary }}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
              // </Form>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  formView: {
    flex: 1.5,
    backgroundColor: "#fff",
    bottom: 50,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});
