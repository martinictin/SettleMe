import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ProductsNavigator } from "./products.navigator";
import { MapScreen } from "../../screens/map.screen";
import { FavoritesScreen } from "../../screens/favorites.screen";
import { FavoritesContextProvider } from "../../contexts/favorites.context";
import { ProductsContextProvider } from "../../contexts/products.context";
import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "md-home",
  Map: "md-map",
  Account: "md-person",
  Favorites: "md-heart",
};

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
    <FavoritesContextProvider>
      <ProductsContextProvider>
        <Tab.Navigator screenOptions={createScreenOptions}>
          <Tab.Screen name="Home" component={ProductsNavigator} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="Account" component={SettingsNavigator} />
        </Tab.Navigator>
      </ProductsContextProvider>
    </FavoritesContextProvider>
  );
};
