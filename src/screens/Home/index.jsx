import React, { useState, useRef, useEffect } from "react";
import { FAB } from "react-native-elements";
import { View, StyleSheet, BackHandler } from "react-native";

import MapView from "react-native-maps";
import { countries } from "../../utilities/countries";
import { useTheme } from "@react-navigation/native";

export default function HomeScreen() {
  /**
   * prevented back button on phone
   */
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  const { colors } = useTheme();
  let map = useRef();

  /**
   * initiated map data
   */
  const [state, setState] = useState({
    curPos: { latitude: 8.965743, longitude: 38.728358 },
    latitudeDelta: 0.9,
    longitudeDelta: 0.9,
  });

  /**
   * Function to change position to next random position
   */
  const changePosition = () => {
    const latitude =
      countries[Math.floor(Math.random() * countries.length)].latitude;
    const longitude =
      countries[Math.floor(Math.random() * countries.length)].longitude;
    setState({
      ...state,
      curPos: { latitude, longitude },
    });
    map.animateCamera({ center: { latitude, longitude } });
  };

  return (
    <View style={styles.flex}>
      <MapView
        ref={(el) => (map = el)}
        style={styles.flex}
        initialRegion={{
          ...state.curPos,
          latitudeDelta: state.latitudeDelta,
          longitudeDelta: state.longitudeDelta,
        }}
      >
        <MapView.Marker coordinate={state.curPos} />
      </MapView>
      <FAB
        onPress={() => changePosition()}
        placement="right"
        color={colors.primary}
        icon={{ name: "shuffle", color: "#fff" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: "100%",
  },
  buttonContainerUpDown: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainerLeftRight: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgba(100,100,100,0.2)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: 50,
    width: 50,
  },
  up: {
    alignSelf: "flex-start",
  },
  down: {
    alignSelf: "flex-end",
  },
  left: {
    alignSelf: "flex-start",
  },
  right: {
    alignSelf: "flex-end",
  },
});
