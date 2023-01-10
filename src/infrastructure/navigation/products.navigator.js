import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ProductDetailScreen } from "../../screens/product-detail.screen";
import { ProductsScreen } from "../../screens/product.screen";

const ProductStack = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <ProductStack.Screen name="Products" component={ProductsScreen} />
      <ProductStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
    </ProductStack.Navigator>
  );
};
