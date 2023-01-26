import React from "react";
import { SvgXml } from "react-native-svg";

import { Spacer } from "../../utillities/spacer/spacer.component";
import star from "../../../assets/star";
import { Favorite } from "../components/favorite.component";
import {
  ProductCard,
  ProductCardCover,
  Info,
  CardInfo,
  CardInfoBold,
  RatingSection,
  Rating,
  Title,
  Description,
} from "../styles/product-info-card.styles";

export const ProductInfoCard = ({ product = {} }) => {
  const {
    name = "Some Restaurant",
    image = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    description = "Some description",
    address = "100 some random street",
    rate = 4.5,
    closing_at,
    opening_at,
    minimal_spending,
    city,
  } = product;

  return (
    <ProductCard elevation={0}>
      <Favorite product={product} />
      <ProductCardCover source={{ uri: image[0] }} />
      <Info>
        <Title>{name}</Title>
        <Spacer size="small" />
        <CardInfo>{city}</CardInfo>
        <Spacer size="medium" />
        <Description>{description}</Description>
        <Spacer size="medium" />
        <CardInfo>
          Open hours: {opening_at}-{closing_at}
        </CardInfo>
        <Spacer size="small" />
        <CardInfo>{address}</CardInfo>
        <Spacer size="small" />
        <CardInfoBold>
          {minimal_spending}€ <CardInfo>/ reservation</CardInfo>{" "}
        </CardInfoBold>
      </Info>
      <RatingSection>
        <SvgXml xml={star} width={20} height={15} />
        <Rating>{rate}</Rating>
      </RatingSection>
    </ProductCard>
  );
};
