import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import styled from "styled-components";
import * as Location from "expo-location";

import { ProductsContext } from "../contexts/products.context";
import { MapCallout } from "../data/components/map-callout.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { products = [] } = useContext(ProductsContext);
  const [userLocation, setUserLocation] = useState([]);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };
  useEffect(() => {
    getUserLocation();
  }, [userLocation]);

  return (
    <>
      <Map
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {products.map((product) => {
          return (
            <Marker
              key={product.name}
              title={product.name}
              coordinate={{
                latitude: product.latitude,
                longitude: product.longitude,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("ProductDetail", { product })
                }
              >
                <MapCallout product={product} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};
