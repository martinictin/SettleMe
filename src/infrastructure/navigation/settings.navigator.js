import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { SettingsScreen } from "../../screens/settings.screen";
import { CameraScreen } from "../../screens/camera.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingsScreen}
      />

      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Camera"
        component={CameraScreen}
      />
    </SettingsStack.Navigator>
  );
};
