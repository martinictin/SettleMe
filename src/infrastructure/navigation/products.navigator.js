import React from "react";
import { ProductDetailScreen } from "../../features/products/screens/product-detail.screen";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ProductsScreen } from "../../features/products/screens/product.screen";

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
