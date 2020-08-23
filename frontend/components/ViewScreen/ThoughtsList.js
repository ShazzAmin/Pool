import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default class ThoughtsList extends React.Component {
  getSentimentColor = (sentiment) => {
    if (sentiment === "NEGATIVE") {
      return "#FFC88C";
    } else if (sentiment === "NEUTRAL") {
      return "#737373";
    } else if (sentiment === "POSITIVE") {
      return "#8CFF9D";
    }
    return "black";
  };

  getDate = (createdAt) => {
    var dateObj = new Date(createdAt);
    var month = dateObj.getUTCMonth(); //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return monthNames[month] + " " + day + ", " + year;
  };

  render() {
    return (
      <FlatList
        style={styles.thoughtsListContainer}
        data={this.props.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <View style={styles.date}>
                <Text style={styles.left}>{this.getDate(item.created_at)}</Text>
                <View style={styles.sentimentContainer}>
                  <MaterialCommunityIcons
                    style={styles.right}
                    name="checkbox-blank-circle"
                    color={this.getSentimentColor(item.sentiment)}
                  />
                  <Text>{Math.round(item.sentiment_confidence * 100)}%</Text>
                </View>
              </View>
              <View>
                <Text>{item.text}</Text>
              </View>
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  thoughtsListContainer: {
    width: "100%",
  },
  card: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 13,
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: "left",
    borderWidth: 2,
    borderColor: "#E7E7E7",
    borderRadius: 10,
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  left: {
    textAlign: "left",
    fontFamily: "Avenir",
    fontSize: 20,
    fontWeight: "400",
  },
  right: {
    paddingRight: 2,
  },
  sentimentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
