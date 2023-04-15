import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { setStars } from "../../services/review.service";
import { setProductAverageRating } from "../../services/product.service";

export default function StarRating({ product_name, onRatingChange }) {
  const [starRating, setStarRating] = useState(null);

  const animatedButtonScale = new Animated.Value(1);

  async function handleRating(number) {
    setStarRating(number);
    try {
      await setStars(number, product_name);
      await setProductAverageRating(product_name);
      onRatingChange(number);
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>
          {starRating ? "Thanks for the rate" : "Tap to rate"}
        </Text>
        <View style={styles.stars}>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => handleRating(1)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 1 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 1 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => handleRating(2)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 2 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 2 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => handleRating(3)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 3 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 3 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => handleRating(4)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 4 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 4 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => handleRating(5)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 5 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 5 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starUnselected: {
    color: "#aaa",
  },
  starSelected: {
    color: "#ffb300",
  },
});
