import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
import { getProductByName } from "../../services/product.service";

export const ReservationInfoCard = ({ reservation = {} }) => {
  const [data, setData] = useState(null);
  const {
    product_name = "Restaurant name",
    reserved_by = "example@mail.com",
    reserved_at = "27/2/2023 16:00",
    reservation_time = "27/2/2023 16:00",
    status = "Pending",
  } = reservation;

  const {
    image = [
      "https://lelolobi.com/wp-content/uploads/2021/11/Test-Logo-Small-Black-transparent-1-1.png",
    ],
    city = "split",
    name = "restaurant name",
  } = data;

  useEffect(() => {
    const unsubscribe = getProductByName(product_name).then((result) => {
      setData(result);
    });
    return () => unsubscribe();
  });

  return (
    <ItemSeparator>
      <Spacer size="large" />
      <Info>
        <ReservationImage source={{ uri: data.image[0] }} />
        <ReservationInfo>
          <Title>{data.name}</Title>
          <Spacer size="small" />
          <CardInfo>{data.city}</CardInfo>
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
          <Spacer size="large" position="top" />
          <ConfirmationSection>
            <Ionicons name="md-checkmark-circle-outline" color={"gold"} />
            {status}
          </ConfirmationSection>
        </ReservationInfo>
      </Info>
      <Spacer size="large" />
    </ItemSeparator>
  );
};
