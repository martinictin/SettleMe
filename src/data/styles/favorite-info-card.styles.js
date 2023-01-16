import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const Icon = styled.Image`
  width: 1px;
  height: 5px;
`;

export const FavoriteCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.colorList.white};
`;

export const FavoriteCardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.colorList.white};
`;

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const RatingSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OpenedSection = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;