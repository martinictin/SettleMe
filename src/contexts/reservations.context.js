import React, { useState, createContext, useEffect } from "react";
import { getReservationsByUser } from "../services/reservation.service";

export const ReservationContext = createContext();

export const ReservationContextProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getReservationsByUser()
      .then((result) => {
        setError(null);
        setIsLoading(false);
        setReservations(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  console.log(reservations);
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
