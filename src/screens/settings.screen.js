import React, { useContext, useCallback, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { List, Avatar } from "react-native-paper";

import { Text } from "../utillities/typography/text.component";
import { Spacer } from "../utillities/spacer/spacer.component";
import { SafeArea } from "../utillities/utills/safe-area.component";
import { AuthenticationContext } from "../contexts/authentication.context";
import { AccountInformationScreen } from "./account-information.screen";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

const BlankSpace = styled(List.Item)`
  padding: ${(props) => props.theme.space[4]};
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
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
      <BlankSpace />
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
      <BlankSpace />

      <List.Section>
        <TouchableOpacity
          onPress={() => navigation.navigate("AccountInformation")}
        >
          <SettingsItem
            title="Account information"
            left={(props) => (
              <List.Icon {...props} color="#FFD700" icon="cog-sync-outline" />
            )}
          />
        </TouchableOpacity>
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="#FFD700" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
