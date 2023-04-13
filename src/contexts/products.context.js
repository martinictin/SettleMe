import React, { useState, createContext, useEffect } from "react";
import { getAllProducts } from "../services/product.service";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utillities/firebase";
import { Alert } from "react-native";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then((result) => {
        setError(null);
        setIsLoading(false);
        setProducts(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

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
