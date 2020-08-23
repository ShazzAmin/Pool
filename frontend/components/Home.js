import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import TitleContainer from "./TitleContainer";
import EnterThought from "./EnterThought";
import PromptButton from "./PromptButton";

const backgroundImg = require("../assets/homeBackground.png");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: [],
      isLoading: true,
      newThought: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImg} style={styles.backgroundImg}>
          <DismissKeyboard>
            <View style={styles.fullScreenContainer}>
              <TitleContainer />
              <EnterThought />
              <PromptButton
                text="view"
                iconName="book"
                onPress={() => this.props.navigation.navigate("ViewStack")}
              />
            </View>
          </DismissKeyboard>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
  },
  fullScreenContainer: {
    flex: 1,
  },
});
