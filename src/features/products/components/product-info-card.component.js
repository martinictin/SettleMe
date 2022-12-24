import React from "react";
import { Text } from "react-native";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Spacer } from "../../../components/spacer/spacer.component";

import {
  Icon,
  ProductCard,
  ProductCardCover,
  Address,
  Info,
  Rating,
  RatingSection,
  OpenedSection,
} from "../components/product-info-card.styles";

export const ProductInfoCard = ({ product: product = {} }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
  } = product;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <ProductCard elevation={5}>
      <ProductCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <RatingSection>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml xml={star} width={20} height={20} />
            ))}
          </Rating>
          <OpenedSection>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </OpenedSection>
        </RatingSection>
        <Address>{address}</Address>
      </Info>
    </ProductCard>
  );
};
