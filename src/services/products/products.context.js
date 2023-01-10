import React, { useState, useContext, createContext, useEffect } from "react";

import {
  productsRequest,
  productsTransform,
} from "../products/products.service";
import { LocationContext } from "../location/location.context";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveProducts = (loc) => {
    setIsLoading(true);
    setProducts([]);

    setTimeout(() => {
      productsRequest(loc)
        .then(productsTransform)
        .then((results) => {
          setIsLoading(false);
          setProducts(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveProducts(locationString);
    }
  }, [location]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
