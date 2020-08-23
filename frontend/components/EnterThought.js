import React from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from "react-native";
import api from "../api";
import { startListening, stopListening } from "../SpeechToText";

const micDisabled = require('../assets/mic_disabled.png');
const micEnabled = require('../assets/mic_enabled.png');

export default class EnterThought extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thought: "",
      recognizingThought: "",
      listening: false,
    };
  }

  submitThought = async () => {
    const res = await api.submitThought(this.state.thought);
  };

  async componentDidMount() {
    // DEBUG
  }

  toggleMic = () => {
    const listening = this.state.listening;
    this.setState({ listening: !listening});
    if (listening) {
      stopListening();
    } else {
      startListening((text) => {
        if (!text) return;
        this.setState({ recognizingThought: text });
      }, (text) => {
        if (!text) return;
        this.setState({ thought: this.state.thought + " " + text, recognizingThought: "" });
      });
    }
  };

  render() {
    const { thought, recognizingThought, listening } = this.state; 
    return (
      <View style={styles.enterThoughtContainer}>
        <Text style={styles.promptText}>add to your pool of thoughts...</Text>
        <View style={styles.thoughtInputContainer}>
          <TextInput
            multiline
            style={styles.thoughtTextInput}
            onChangeText={thought => this.setState({ thought })}
            fontSize={18}
            value={thought + (recognizingThought.length > 0 ? " " + recognizingThought : "")}
            placeholder="it's a moo point"
          />
        </View>
        <Button
          onPress={this.submitThought}
          title="Save"
          accessibilityLabel="Submit a thought"
        />
        <Text style={styles.saveInfoText}>
          don't worry, any edits are autosaved and we'll log whatever you got at
          12:00am :)
        </Text>
        <TouchableOpacity style={styles.micButton} onPress={this.toggleMic}>
          <Image source={listening ? micEnabled : micDisabled} style={styles.micImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  enterThoughtContainer: {
    width: "100%",
    alignItems: "center",
  },
  promptText: {
    fontFamily: "Avenir",
    fontSize: 18,
    marginBottom: 20,
  },
  thoughtInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  thoughtTextInput: {
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    flex: 1,
    paddingHorizontal: 15,
    fontFamily: "Avenir",
    color: "#595959",
  },
  saveInfoText: {
    textAlign: "center",
    fontFamily: "Avenir",
    color: "#787878",
    paddingTop: 25,
    paddingHorizontal: 60,
  },
  micButton: {
    textAlign: "center",
  },
  micImage: {
    width: 49,
    height: 49,
    marginTop: 10,
  }
});
