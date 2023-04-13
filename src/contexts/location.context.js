import React, { useState, useEffect, createContext } from "react";
import { getAllProducts, getProductsInCity } from "../services/product.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState(null);
  const [locationProducts, setLocationProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (keyword === null || keyword.length <= 2) {
      getAllProducts()
        .then((result) => {
          setError(null);
          setIsLoading(false);
          setLocationProducts(result);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    } else {
      getProductsInCity(keyword)
        .then((result) => {
          setError(null);
          setIsLoading(false);
          setLocationProducts(result);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        locationProducts,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
