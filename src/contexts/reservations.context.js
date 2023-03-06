import React, { useState, useContext, createContext, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utillities/firebase";
import { Alert } from "react-native";

export const ReservationContext = createContext();

export const ReservationContextProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      onSnapshot(query(collection(db, "reservation")), (querySnapshot) => {
        let reservationList = [];
        querySnapshot.forEach((doc) => {
          reservationList.push({ ...doc.data(), id: doc.id });
        });
        setReservations(reservationList);
        setIsLoading(false);
      });
    } catch (e) {
      setError(e);
      Alert.alert(e);
      setIsLoading(false);
    }
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        isLoading,
        error,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
