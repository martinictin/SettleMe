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
  RatingSection,
  Rating,
  Title,
} from "../styles/favorite-info-card.styles";

export const FavoriteInfoCard = ({ favorite = {} }) => {
  const {
    name = "Some Restaurant",
    image = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    rate = 4.5,
    city,
  } = favorite;

  return (
    <ProductCard elevation={0}>
      <Favorite product={favorite} />
      <ProductCardCover source={{ uri: image[0] }} />
      <Info>
        <Title>{name}</Title>
        <RatingSection>
          <SvgXml xml={star} width={20} height={20} />
          <Rating>{rate}</Rating>
        </RatingSection>
      </Info>
      <Spacer size="small" />
      <CardInfo>{city}</CardInfo>
    </ProductCard>
  );
};
