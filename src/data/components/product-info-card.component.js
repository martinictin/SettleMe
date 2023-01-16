import React from "react";
import { SvgXml } from "react-native-svg";

import { Spacer } from "../../utillities/spacer/spacer.component";
import { Text } from "../../utillities/typography/text.component";
import star from "../../../assets/star";
import open from "../../../assets/open";
import { Favorite } from "../components/favorite.component";
import {
  ProductCard,
  ProductCardCover,
  Info,
  RatingSection,
  OpenedSection,
  Rating,
  Icon,
  Address,
} from "../styles/product-info-card.styles";

export const ProductInfoCard = ({ product = {} }) => {
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
    placeId,
  } = product;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <ProductCard elevation={5}>
      <Favorite product={product} />
      <ProductCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <RatingSection>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
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