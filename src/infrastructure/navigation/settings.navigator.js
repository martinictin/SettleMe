import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { SettingsScreen } from "../../screens/settings.screen";
import { CameraScreen } from "../../screens/camera.screen";
import { AccountInformationScreen } from "../../screens/account-information.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      // headerMode="screen"
      screenOptions={{
        headerMode: "screen",
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

      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="AccountInformation"
        component={AccountInformationScreen}
      />
    </SettingsStack.Navigator>
  );
};
