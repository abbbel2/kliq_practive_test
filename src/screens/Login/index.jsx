import React from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { useTheme } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const { height, width } = Dimensions.get("window");
  const { colors } = useTheme();
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
        <View style={{ padding: 20 }}>
          <Text style={{ color: colors.primary, fontSize: 20 }}>
            Welcome Back,
          </Text>
          <View style={{ marginTop: height / 15 }}>
            <Input
              placeholder="User name"
              rightIcon={{ name: "person", color: colors.primary }}
              label="User name"
              //  onChangeText={value => this.setState({ comment: value })}
            />
            <Input
              placeholder="Password"
              rightIcon={{ name: "lock", color: colors.primary }}
              label="Password"
              secureTextEntry={true}
              //  onChangeText={value => this.setState({ comment: value })}
            />
          </View>
          <View style={{ marginTop: height / 18 }}>
            <Button
              title="Login"
              buttonStyle={{ backgroundColor: colors.primary }}
              onPress={() => navigation.navigate("HomeScreen")}
            />
          </View>
        </View>
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
