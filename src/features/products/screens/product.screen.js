import React from "react";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProductInfoCard } from "../components/product-info-card.component";
import { SafeArea, SearchContainer } from "../screens/product.screen.styles";

export const ProductsScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <FlatList
      data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }]}
      renderItem={() => (
        <Spacer position="top" size="large">
          <ProductInfoCard />
        </Spacer>
      )}
      keyExtractor={(item) => item.name}
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{ padding: 20 }}
    />
  </SafeArea>
);
