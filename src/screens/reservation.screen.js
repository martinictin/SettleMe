import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Flatlist } from "react-native";
import { SafeArea } from "../utillities/utills/safe-area.component";
import { TitleText, TitleContainer } from "../data/styles/title.styles";
import { getReservationsByUser } from "../services/reservation.service";
import { Alert } from "react-native";

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

  useEffect(() => {
    setIsLoading(true);
    setEmpty(true);
    async function fetchData() {
      const data = await getReservationsByUser();
      if (data) {
        setReservations(data);
        setIsLoading(false);
        setEmpty(false);
      } else {
        Alert.alert("No data");
      }
    }

    fetchData();
  }, []);

  console.log(reservations);
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
    </SafeArea>
  );
};
