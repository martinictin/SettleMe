import React, { useContext, useCallback, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, ActivityIndicator, MD2Colors } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

import {
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
} from "../data/styles/account.styles";
import { Spacer } from "../utillities/spacer/spacer.component";
import { SafeArea } from "../utillities/utills/safe-area.component";
import { Text } from "../utillities/typography/text.component";
import { AuthenticationContext } from "../contexts/authentication.context";
import { changeAccountInfo } from "../services/authentication.service";
import { auth } from "../utillities/firebase";

export const AccountInformationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { error, isLoading } = useState(false);
  const { user } = useContext(AuthenticationContext);

  const AvatarContainer = styled.View`
    align-items: center;
  `;

  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  return (
    <SafeArea>
      <Spacer size="large" />
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {!photo && (
            <Avatar.Icon
              size={100}
              icon="account"
              style={{ backgroundColor: "#FFFFFF" }}
              color="#FFD700"
            />
          )}
          {photo && (
            <Avatar.Image
              size={100}
              source={{ uri: photo }}
              backgroundColor="black"
            />
          )}
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>

      <AccountContainer>
        {user.name ? (
          <AuthInput
            label={user.name}
            value={name}
            backgroundColor="#FFFFFF"
            autoCapitalize="none"
            onChangeText={(u) => setName(u)}
          />
        ) : (
          <AuthInput
            label="Name"
            value={name}
            backgroundColor="#FFFFFF"
            textColor="#232023"
            autoCapitalize="none"
            onChangeText={(u) => setName(u)}
          />
        )}
        <Spacer size="large">
          {user.lastName ? (
            <AuthInput
              label={user.lastName}
              value={lastName}
              backgroundColor="#FFFFFF"
              autoCapitalize="none"
              onChangeText={(u) => setLastName(u)}
            />
          ) : (
            <AuthInput
              label="Last Name"
              value={lastName}
              backgroundColor="#FFFFFF"
              autoCapitalize="none"
              onChangeText={(u) => setLastName(u)}
            />
          )}
        </Spacer>
        <Spacer size="large">
          {user.phoneNumber ? (
            <AuthInput
              label={user.phoneNumber}
              value={phoneNumber}
              backgroundColor="#FFFFFF"
              autoCapitalize="none"
              onChangeText={(u) => setPhoneNumber(u)}
            />
          ) : (
            <AuthInput
              label="Phone Number"
              value={phoneNumber}
              backgroundColor="#FFFFFF"
              autoCapitalize="none"
              onChangeText={(u) => setPhoneNumber(u)}
            />
          )}
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            backgroundColor="#FFFFFF"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            backgroundColor="#FFFFFF"
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
              mode="contained"
              textColor="gold"
              buttonColor="black"
              onPress={() =>
                changeAccountInfo(
                  name,
                  lastName,
                  phoneNumber,
                  password,
                  repeatedPassword
                )
              }
            >
              Submit
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
    </SafeArea>
  );
};
