import React from "react";

import { Spacer } from "../utillities/spacer/spacer.component";
import {
  AccountContainer,
  AccountBackground,
  AuthButton,
  Title,
} from "../data/styles/account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <Title>SettleMe</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          textColor="gold"
          buttonColor="black"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            textColor="gold"
            buttonColor="black"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
