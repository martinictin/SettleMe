import React, { useState, createContext } from "react";
import { loginRequest } from "../authentication/authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        alert("Login Successful!");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.toString());
        alert(error);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
