import React from "react";
import { View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

export const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View>
      <SliderBox
        images={product.image}
        dotColor="gold"
        inactiveDotColor="black"
        imageLoadingColor="gold"
      />
    </View>
  );
};
