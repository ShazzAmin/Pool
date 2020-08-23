import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ViewButton = (props) => {
  const { text, iconName, onPress } = props;
  return (
    <View style={styles.mainBtnContainer}>
      <Text style={styles.btnText}>{text}</Text>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          onPress();
        }}
      >
        {/* <React.Fragment> */}
        <MaterialIcons name={iconName} size={28} color="white" />
        {/* </React.Fragment> */}
      </TouchableOpacity>
    </View>
  );
};
export default ViewButton;

const styles = StyleSheet.create({
  mainBtnContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 35,
    alignItems: "center",
  },
  btnContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0085FF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: 'bold',
    color: "#0085FF",
    paddingBottom: 5
  },
});
