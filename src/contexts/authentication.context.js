import React, { useState, createContext, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";

import {
  getUserInfo,
  loginRequest,
  setUserInfo,
} from "../services/authentication.service";
import { Alert } from "react-native";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = useRef(getAuth()).current;

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        setIsLoading(false);
      })
      .catch((e) => {
        Alert.alert("error:", e.message);
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
    setUserInfo(email);
  };

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setError(null);
      })
      .catch((err) => {
        setError(err);
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
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
