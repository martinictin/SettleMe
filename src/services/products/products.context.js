import React, { useState, useContext, createContext, useEffect } from "react";

import { productsRequest, productsTransform } from "./products.service";

import { LocationContext } from "../location/location.context";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState(["toronto"]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveProducts = (loc) => {
    setIsLoading(true);
    setProducts([]);

    productsRequest(loc)
      .then(productsTransform)
      .then((results) => {
        setError(null);
        setIsLoading(false);
        setProducts(results);
      })
      .catch((err) => {
        setProducts([]);
        setIsLoading(false);
        setError(err);
      });
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
