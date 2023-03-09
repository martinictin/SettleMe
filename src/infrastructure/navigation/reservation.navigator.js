import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ReservationDetailScreen } from "../../screens/reservation-detail.screen";
import { ReservationScreen } from "../../screens/reservation.screen";

const ReservationStack = createStackNavigator();

export const ReservationNavigator = () => {
  return (
    <ReservationStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <ReservationStack.Screen
        name="Reservations"
        component={ReservationScreen}
      />
    </ReservationStack.Navigator>
  );
};
