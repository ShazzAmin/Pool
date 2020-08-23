import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import api from "../../api";
import PromptButton from "../PromptButton";
import ThoughtsList from "../ViewScreen/ThoughtsList";
import TitleContainer from "../TitleContainer";

export default class Recent extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      thoughts: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = async () => {
    try {
      const thoughts = await api.getThoughts();
      if (this._isMounted && thoughts !== undefined)
        this.setState({ thoughts, isLoading: false });
    } catch (error) {
      Promise.reject(error);
    }
  };

  render() {
    const { thoughts, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <TitleContainer showDrawer={true} navigation={this.props.navigation} />
        <Text style={styles.recentText}>recent</Text>
        {isLoading ? (
          <Text style={styles.loadingText}>loading...</Text>
        ) : thoughts.length ? (
          <ThoughtsList data={thoughts} />
        ) : (
          <View style={styles.emptyThoughtsContainer}>
            <Text>no thoughts :(</Text>
            <Text>add some by clicking below</Text>
          </View>
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
    paddingBottom: 20,
  },
  loadingText: {
    paddingTop: 30,
    textAlign: "center",
  },
  emptyThoughtsContainer: {
    alignItems: "center",
  },
  recentText: {
    fontFamily: "Avenir",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
});
