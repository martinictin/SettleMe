import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountContainer,
  AuthButton,
  Title,
} from "../components/account.styles";

import { AccountBackground } from "../components/account.styles";

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
