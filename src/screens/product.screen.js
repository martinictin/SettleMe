import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";

import { Search } from "../data/components/search.component";
import { SafeArea } from "../utillities/utills/safe-area.component";
import { Spacer } from "../utillities/spacer/spacer.component";
import { ProductsContext } from "../contexts/products.context";
import { ProductInfoCard } from "../data/components/product-info-card.component";
import { FadeInView } from "../utillities/animations/fade.animation";
import { LocationContext } from "../contexts/location.context";

const ProductList = styled(FlatList).attrs({
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

export const ProductsScreen = ({ navigation }) => {
  const { isLoading, products, error } = useContext(ProductsContext);
  const { error: locationError, locationProducts } =
    useContext(LocationContext);
  const hasError = !!error || !!locationError;

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.yellow500} />
        </LoadingContainer>
      )}
      <Search />
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}
      {!hasError && (
        <ProductList
          data={!locationProducts ? products : locationProducts}
          keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.id || index.toString()}
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  product: item,
                  key: item.id,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <ProductInfoCard product={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeArea>
  );
};
