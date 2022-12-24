import React from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components";
import { FlatList } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProductInfoCard } from "../components/product-info-card.component";
import { SafeArea } from "../../../components/utills/safe-area.component";

export const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.colorList.lblack};
`;

export const ProductList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const ProductsScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <ProductList
      data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }]}
      renderItem={() => (
        <Spacer position="top" size="large">
          <ProductInfoCard />
        </Spacer>
      )}
      keyExtractor={(item) => item.name}
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{ padding: 16 }}
    />
  </SafeArea>
);
