import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class TitleContainer extends React.Component {
  render() {
    const topSpacing = {
      height: getStatusBarHeight() + 20,
    };

    return (
      <View>
        <View style={topSpacing}></View>
        <View style={styles.rowContainer}>
          {this.props.showDrawer ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <MaterialCommunityIcons name="menu" size={35} color="#DBDBDB" />
            </TouchableOpacity>
          ) : (
            <MaterialCommunityIcons name="menu" size={35} color="white" />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>pool</Text>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={40}
              color="#0085FF"
            />
          </View>
          <MaterialCommunityIcons name="menu" size={35} color="white" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: -16,
  },
});
