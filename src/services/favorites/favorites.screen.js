import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { SafeArea } from "../../components/utills/safe-area.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { FavoritesContext } from "./favorites.context";
import { FavoriteInfoCard } from "../../services/favorites/components/favorite-info-card.component";

const FavoritesList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const FavoritesScreen = ({ navigation }) => {
  const { isLoading, favorites } = useContext(FavoritesContext);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.yellow500} />
        </LoadingContainer>
      )}
      <FavoritesList
        data={favorites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  product: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FavoriteInfoCard favorite={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};