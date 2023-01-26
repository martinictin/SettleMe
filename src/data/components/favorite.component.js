import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { FavoritesContext } from "../../contexts/favorites.context";

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

export const Favorite = ({ product }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const isFavorite = favorites.find((r) => r.placeId === product.placeId);

  return (
    <FavoriteButton
      onPress={() =>
        !isFavorite ? addToFavorites(product) : removeFromFavorites(product)
      }
    >
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        size={20}
        color={isFavorite ? "red" : "white"}
      />
    </FavoriteButton>
  );
};
