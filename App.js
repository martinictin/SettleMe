import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { Navigation } from "./src/infrastructure/navigation";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firestore } from "@react-native-firebase/firestore";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyAqBlxP35uEtc6Vb-GxPIqDe4HMo0MAAuc",
  authDomain: "settleme-e4d99.firebaseapp.com",
  projectId: "settleme-e4d99",
  storageBucket: "settleme-e4d99.appspot.com",
  messagingSenderId: "219423936459",
  appId: "1:219423936459:web:3e1147bf7bc55f5268f04e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
