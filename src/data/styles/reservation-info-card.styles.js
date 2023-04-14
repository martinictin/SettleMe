import styled from "styled-components/native";
import { Image } from "react-native";

export const CardInfo = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const ConfirmationSection = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.colorList.gold};
`;

export const Info = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: bold;
`;

export const ReservationImage = styled(Image)`
  width: 35%;
  height: 100%;
  margin-right: 2%;
  margin-left: 1%;
`;

export const ReservationInfo = styled.View`
  padding: ${(props) => props.theme.space[1]};
  display: flex;
`;

export const CardInfoBold = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: bold;
`;

export const ItemSeparator = styled.View`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.theme.colors.colorList.lgold};
`;
