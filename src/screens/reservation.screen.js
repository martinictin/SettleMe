import React, { useContext } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { SafeArea } from "../utillities/utills/safe-area.component";
import { Spacer } from "../utillities/spacer/spacer.component";
import { ReservationContext } from "../contexts/reservations.context";
import { ReservationInfoCard } from "../data/components/reservation-info-card.component";
import { getReservationsByUser } from "../services/reservation.service";
import { setReservationByUser } from "../services/reservation.service";
import { auth } from "../utillities/firebase";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const ReservationScreen = ({ navigation }) => {
  //function test
  //console.log(setReservationByUser(2023, 2, 30, 14, 30));
  //console.log(getReservationsByUser(auth.currentUser.uid));
  //

  const { isLoading, reservations } = useContext(ReservationContext);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.yellow500} />
        </LoadingContainer>
      )}
      <FlashList
        data={reservations}
        renderItem={({ item }) => {
          return <ReservationInfoCard reservation={item} />;
        }}
        keyExtractor={(item) => item.id}
        estimatedItemSize={20}
      />
    </SafeArea>
  );
};
