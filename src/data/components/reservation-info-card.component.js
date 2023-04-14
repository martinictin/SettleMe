import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Spacer } from "../../utillities/spacer/spacer.component";
import {
  ReservationImage,
  Info,
  CardInfo,
  CardInfoBold,
  Title,
  ReservationInfo,
  ItemSeparator,
  ConfirmationSection,
} from "../styles/reservation-info-card.styles";
import { SafeArea } from "../../utillities/utills/safe-area.component";
import { getProductByName } from "../../services/product.service";

export const ReservationInfoCard = ({ reservation = {} }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { product_name } = reservation;

  useEffect(() => {
    if (product_name) {
      setIsLoading(true);
      getProductByName(product_name)
        .then((result) => {
          if (result !== undefined && result !== null) {
            setProduct(result);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [product_name]);

  const {
    reserved_by = "example@mail.com",
    reserved_at = "27/2/2023 16:00",
    reservation_time = "27/2/2023 16:00",
    status = "Pending",
  } = reservation;

  return (
    <>
      {!isLoading && (
        <>
          <Spacer size="large" />
          <Info>
            {product.image && (
              <ReservationImage source={{ uri: product.image[0] }} />
            )}
            <ReservationInfo>
              {product.name && <Title>{product.name}</Title>}
              <Spacer size="small" />
              {product.city && <CardInfo>{product.city}</CardInfo>}
              <Spacer size="small" />
              <CardInfo>
                <CardInfoBold>Reserved at: </CardInfoBold>
                {reserved_at.toDate().toLocaleString()}
              </CardInfo>
              <Spacer size="small" />
              <CardInfo>
                <CardInfoBold>Reservation time: </CardInfoBold>
                {reservation_time.toDate().toLocaleString()}
              </CardInfo>
              <CardInfoBold>{reserved_by}</CardInfoBold>
              <ConfirmationSection>
                <Ionicons name="md-checkmark-circle-outline" color={"gold"} />
                {status}
              </ConfirmationSection>
            </ReservationInfo>
          </Info>
          <Spacer size="large" />
          <ItemSeparator />
        </>
      )}
    </>
  );
};
