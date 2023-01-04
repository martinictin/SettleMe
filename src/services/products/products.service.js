import camelize from "camelize";
import { host, isMock } from "../../components/utills/env";

export const productsRequest = (location) => {
  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then(
    (res) => {
      return res.json();
    }
  );
};

export const productsTransform = ({ results = [] }) => {
  const mappedResults = results.map((product) => {
    return {
      ...product,
      address: product.vicinity,
      isOpenNow: product.opening_hours && product.opening_hours.open_now,
      isClosedTemporarily: product.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
