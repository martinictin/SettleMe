import React, { useState, useContext } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../models/styles/account.styles";
import { Text } from "../utillities/typography/text.component";
import { Spacer } from "../utillities/spacer/spacer.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <Title>SettleMe</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              textColor="gold"
              buttonColor="black"
              onPress={() => onRegister(email, password, repeatedPassword)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={MD2Colors.yellow500} />
          )}
        </Spacer>
        <Spacer size="medium">
          <AuthButton
            mode="contained"
            textColor="gold"
            buttonColor="black"
            onPress={() => navigation.goBack()}
          >
            Back
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
