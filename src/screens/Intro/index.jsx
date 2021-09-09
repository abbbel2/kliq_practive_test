import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.main} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../../assets/intro-image3.jpg")}
        style={{ height: Dimensions.get("window").height / 1.5 }}
      ></ImageBackground>
      <View style={styles.content}>
        <Text style={styles.mainContentText}>Get started</Text>
        <Text style={styles.secondaryContentText}>
          Move to login page to test out the app
        </Text>
      </View>
      <View style={styles.contentButton}>
        <TouchableOpacity
          style={styles.secondaryContentButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Icon name={"chevron-right"} size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderTopRightRadius: 30,
    borderTopEndRadius: 30,
  },
  mainContentText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  secondaryContentText: {
    color: "#7484d8",
  },
  contentButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  secondaryContentButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#2d409c",
    borderRadius: 50,
  },
});
