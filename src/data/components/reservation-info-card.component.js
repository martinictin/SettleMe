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
  const [product, setProduct] = useState(null);
  const {
    prouct_name = "example",
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
  } = product;

  useEffect(() => {
    async function fetchData(product_name) {
      const data = await getProductByName(product_name);
      if (data) {
        console.log(data);
        setProduct(data);
      } else {
        console.log("No such product!");
      }
    }

    fetchData();
  }, []);

  return (
    <ItemSeparator>
      <Spacer size="large" />
      <Info>
        <ReservationImage source={{ uri: product.image[0] }} />
        <ReservationInfo>
          <Title>{product.name}</Title>
          <Spacer size="small" />
          <CardInfo>{product.city}</CardInfo>
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
