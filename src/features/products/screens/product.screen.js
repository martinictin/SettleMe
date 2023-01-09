import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { SafeArea } from "../../../components/utills/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProductsContext } from "../../../services/products/products.context";
import { Search } from "../components/search.component";
import { ProductInfoCard } from "../components/product-info-card.component";
import { FadeInView } from "../../../components/animations/fade.animation";

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
  const { isLoading, products } = useContext(ProductsContext);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.yellow500} />
        </LoadingContainer>
      )}
      <Search />
      <ProductList
        data={products}
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
                <FadeInView>
                  <ProductInfoCard product={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
