import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import api from "../../api";

import ThoughtsList from "./ThoughtsList";
import TitleContainer from "../TitleContainer";
import PromptButton from "../PromptButton";

const defaultRadioButtons = [
  {
    label: "year",
  },
  {
    label: "month",
  },
  {
    label: "week",
  },
];

export default class Recent extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      thoughts: [],
      isLoading: true,
      radioButtons: defaultRadioButtons,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getData("year");
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = async (period) => {
    try {
      const thoughts = await api.getThisDayThoughts(period);
      if (this._isMounted) this.setState({ thoughts, isLoading: false });
    } catch (error) {
      Promise.reject(error);
    }
  };

  onPress = async (data) => {
    this.setState({ isLoading: true });
    const period = data.find((item) => item.selected).value;
    const thoughts = await api.getThisDayThoughts(period);
    this.setState({ radioButtons: data, thoughts, isLoading: false });
  };

  render() {
    const { thoughts, radioButtons, isLoading } = this.state;
    console.log(thoughts);
    return (
      <View style={styles.container}>
        <TitleContainer showDrawer={true} navigation={this.props.navigation} />
        <Text style={styles.onThisDayText}>on this day</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={this.onPress}
          flexDirection="row"
        />
        {isLoading ? (
          <Text style={styles.loadingText}>loading...</Text>
        ) : (
          <ThoughtsList data={thoughts} />
        )}
        <PromptButton
          text="write"
          iconName="edit"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  onThisDayText: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  loadingText: {
    paddingTop: 30,
    textAlign: "center",
  },
});
