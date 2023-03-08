import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { SafeArea } from "../utillities/utills/safe-area.component";
import { ReservationInfoCard } from "../data/components/reservation-info-card.component";
import { TitleText, TitleContainer } from "../data/styles/title.styles";
import { getReservationsByUser } from "../services/reservation.service";
import { auth } from "../utillities/firebase";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Empty = styled.Text`
  font-weight: bold;
  color: gold;
  font-size: 24px;
`;
const EmptyContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 25%;
`;

export const ReservationScreen = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [isEmpty, setEmpty] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    setEmpty(true);
    const fetchUserReservationData = async () => {
      try {
        const reservations = await getReservationsByUser();
        setReservations(reservations);
        setIsLoading(false);
        if (reservations.length > 0) {
          setEmpty(false);
        }
      } catch (e) {
        setIsLoading(false);
        setError(e);
        setEmpty(true);
      }
    };

    fetchUserReservationData();
  }, []);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.yellow500} />
        </LoadingContainer>
      )}
      {isEmpty && (
        <EmptyContainer>
          <Empty>No Reservations yet</Empty>
        </EmptyContainer>
      )}
      <TitleContainer>
        <TitleText>Reservations</TitleText>
      </TitleContainer>
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
