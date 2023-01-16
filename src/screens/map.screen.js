import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import styled from "styled-components";

import { LocationContext } from "../services/location/location.context";
import { ProductsContext } from "../services/products/products.context";
import { Search } from "../data/components/map-search.component";
import { MapCallout } from "../data/components/map-callout.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { products = [] } = useContext(ProductsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.2,
        }}
      >
        {products.map((product) => {
          return (
            <Marker
              key={product.name}
              title={product.name}
              coordinate={{
                latitude: product.geometry.location.lat,
                longitude: product.geometry.location.lng,
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
