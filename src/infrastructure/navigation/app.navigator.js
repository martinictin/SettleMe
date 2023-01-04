import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ProductsNavigator } from "../navigation/products.navigator";
import { SafeArea } from "../../components/utills/safe-area.component";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "md-home",
  Map: "md-map",
  Account: "md-person",
};

const Account = () => (
  <SafeArea>
    <Text>Account</Text>
  </SafeArea>
);
const Map = () => (
  <SafeArea>
    <Text>Map</Text>
  </SafeArea>
);

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    headerShown: false,
    tabBarActiveTintColor: "gold",
    tabBarInactiveTintColor: "black",
    tabBarStyle: [
      {
        display: "flex",
      },
      null,
    ],
  };
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Home" component={ProductsNavigator} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
