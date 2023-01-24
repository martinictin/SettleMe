import React, { useState, useContext, createContext, useEffect } from "react";
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
    try {
      onSnapshot(query(collection(db, "product")), (querySnapshot) => {
        let productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productList);
        setIsLoading(false);
      });
    } catch (e) {
      setError(e);
      Alert.alert(e);
      setIsLoading(false);
    }
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
