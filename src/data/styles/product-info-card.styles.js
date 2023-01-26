import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const ProductCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.colorList.white};
  padding: ${(props) => props.theme.space[3]};
  outline: "transparent";
`;

export const CardInfo = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const CardInfoBold = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: bold;
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[1]};
`;

export const RatingSection = styled.View`
  padding-left: 88%;
  flex-direction: row;
`;

export const Rating = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: bold;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: bold;
`;

export const Description = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.colorList.grey};
`;

export const ProductCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.colorList.white};
`;
