import React from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./components/Home";
import Recent from "./components/ViewScreen/Recent";
import OnThisDay from "./components/ViewScreen/OnThisDay";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const config = {
  animation: "timing",
  config: {
    duration: 0,
  },
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Recent">
      <Drawer.Screen
        name="Recent"
        component={Recent}
        options={{ transitionSpec: { open: config, close: config } }}
      />
      <Drawer.Screen name="OnThisDay" component={OnThisDay} />
    </Drawer.Navigator>
  );
};

export default class App extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      Avenir: require("./assets/fonts/AvenirLTStd-Medium.otf"),
    });
  }

  render() {
    console.disableYellowBox = true;

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode={"none"}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="ViewStack"
            component={DrawerNavigation}
            options={{ transitionSpec: { open: config, close: config } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
