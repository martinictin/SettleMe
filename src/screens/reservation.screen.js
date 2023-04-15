import React, { useContext, useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { SafeArea } from "../utillities/utills/safe-area.component";
import { TitleText, TitleContainer } from "../data/styles/title.styles";
import { ReservationContext } from "../contexts/reservations.context";
import { ReservationInfoCard } from "../data/components/reservation-info-card.component";
import { FadeInView } from "../utillities/animations/fade.animation";

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
  color: black;
  font-size: 24px;
`;
const EmptyContainer = styled.View`
  position: absolute;
  top: 40%;
  left: 23%;
`;
const ErrorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: red;
  margin-bottom: 10px;
`;

export const ReservationScreen = () => {
  const { isLoading, reservations, error } = useContext(ReservationContext);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(reservations.length < 1);
  }, [reservations]);

  return (
    <>
      {error ? (
        <SafeArea>
          <ErrorContainer>
            <ErrorText>
              An error occurred while fetching reservations.
            </ErrorText>
          </ErrorContainer>
        </SafeArea>
      ) : (
        <SafeArea>
          {isLoading && (
            <LoadingContainer>
              <Loading size={50} animating={true} color={MD2Colors.yellow500} />
            </LoadingContainer>
          )}
          {isEmpty ? (
            <EmptyContainer>
              <Empty>No Reservations yet</Empty>
            </EmptyContainer>
          ) : (
            <>
              <TitleContainer>
                <TitleText>Reservations</TitleText>
              </TitleContainer>
              <FlatList
                data={reservations}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <FadeInView>
                    <View style={{ flex: 1 }}>
                      <ReservationInfoCard
                        reservation={item}
                        key={`${item.name}_${index}`}
                      />
                    </View>
                  </FadeInView>
                )}
              />
            </>
          )}
        </SafeArea>
      )}
    </>
  );
};
