import React, { useContext, useCallback, useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  TouchableOpacity,
  ActivityIndicator,
  MD2Colors,
  ScrollView,
} from "react-native";
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
import {
  updateUserInfo,
  getUserInfo,
  changePassword,
} from "../services/authentication.service";

export const AccountInformationScreen = ({ navigation }) => {
  const [userObj, setUserObj] = useState({
    name: "",
    last_name: "",
    phone_number: "",
    currentPassword: "",
    password: "",
    reapeatedPassword: "",
  });
  const [photo, setPhoto] = useState(null);
  const { error, isLoading } = useState(false);
  const { user } = useContext(AuthenticationContext);

  const AvatarContainer = styled.View`
    align-items: center;
  `;

  useEffect(() => {
    async function fetchData() {
      const data = await getUserInfo();
      if (data) {
        setUserObj(data);
      }
    }

    fetchData();
  }, []);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  function handleNameChange(text) {
    setUserObj((prevState) => ({ ...prevState, name: text }));
  }
  function handleLastNameChange(text) {
    setUserObj((prevState) => ({ ...prevState, last_name: text }));
  }
  function handlePhoneNumberChange(text) {
    setUserObj((prevState) => ({ ...prevState, phone_number: text }));
  }
  function handleCurrentPasswordChange(text) {
    setUserObj((prevState) => ({ ...prevState, currentPassword: text }));
  }
  function handlePasswordChange(text) {
    setUserObj((prevState) => ({ ...prevState, password: text }));
  }
  function handleReapetedPasswordChange(text) {
    setUserObj((prevState) => ({ ...prevState, reapeatedPassword: text }));
  }

  return (
    <SafeArea>
      <ScrollView>
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
          {userObj.name ? (
            <AuthInput
              label="Name"
              value={userObj.name}
              backgroundColor="#FFFFFF"
              autoCapitalize="none"
              onChangeText={(u) => handleNameChange(u)}
            />
          ) : (
            <AuthInput
              label="Name"
              backgroundColor="#FFFFFF"
              textColor="#232023"
              autoCapitalize="none"
              onChangeText={(u) => handleNameChange(u)}
            />
          )}
          <Spacer size="large">
            {userObj.last_name ? (
              <AuthInput
                label="Last Name"
                value={userObj.last_name}
                backgroundColor="#FFFFFF"
                autoCapitalize="none"
                onChangeText={(u) => handleLastNameChange(u)}
              />
            ) : (
              <AuthInput
                label="Last Name"
                backgroundColor="#FFFFFF"
                autoCapitalize="none"
                onChangeText={(u) => handleLastNameChange(u)}
              />
            )}
          </Spacer>
          <Spacer size="large">
            {userObj.phone_number ? (
              <AuthInput
                label="Phone number"
                value={userObj.phone_number}
                backgroundColor="#FFFFFF"
                autoCapitalize="none"
                onChangeText={(u) => handlePhoneNumberChange(u)}
              />
            ) : (
              <AuthInput
                label="Phone Number"
                backgroundColor="#FFFFFF"
                autoCapitalize="none"
                onChangeText={(u) => handlePhoneNumberChange(u)}
              />
            )}
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
                  updateUserInfo(
                    userObj.name,
                    userObj.last_name,
                    userObj.phone_number
                  )
                }
              >
                Change Account Info
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={MD2Colors.yellow500} />
            )}
          </Spacer>
          <Spacer size="large">
            <AuthInput
              label="Current password"
              textContentType="password"
              backgroundColor="#FFFFFF"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(p) => handleCurrentPasswordChange(p)}
            />
          </Spacer>
          <Spacer size="large">
            <AuthInput
              label="Password"
              textContentType="password"
              backgroundColor="#FFFFFF"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(p) => handlePasswordChange(p)}
            />
          </Spacer>
          <Spacer size="large">
            <AuthInput
              label="Repeated Password"
              backgroundColor="#FFFFFF"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(p) => handleReapetedPasswordChange(p)}
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
                  changePassword(
                    userObj.currentPassword,
                    userObj.password,
                    userObj.reapeatedPassword
                  )
                }
              >
                Change Password
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={MD2Colors.yellow500} />
            )}
          </Spacer>
          <Spacer size="large" />
          <Spacer size="large">
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
      </ScrollView>
    </SafeArea>
  );
};
