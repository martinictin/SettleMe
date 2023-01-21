import { mocks, mockImages } from "./mock";
import camelize from "camelize";

export const productsRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

export const productsTransform = ({ results = [] }) => {
  const mappedResults = results.map((product) => {
    product.photos = product.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    return {
      ...product,
      address: product.vicinity,
      isOpenNow: product.opening_hours && product.opening_hours.open_now,
      isClosedTemporarily: product.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
