import React from "react";
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
import { auth } from "../../utillities/firebase";

export const ReservationInfoCard = ({ product = {}, reservation = {} }) => {
  const {
    name = "Restaurant name",
    image = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    city = "Split",
  } = product;

  const {
    reserved_at = "27/2/2023 16:00",
    reservation_time = "27/2/2023 16:00",
    status = "Pending",
  } = reservation;

  const user = auth.currentUser;

  return (
    <ItemSeparator>
      <Spacer size="large" />
      <Info>
        <ReservationImage source={{ uri: image[0] }} />
        <ReservationInfo>
          <Title>{name}</Title>
          <Spacer size="small" />
          <CardInfo>{city}</CardInfo>
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
          <CardInfoBold>{user.email}</CardInfoBold>
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
