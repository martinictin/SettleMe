import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const ProductHeader = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ProductDetailView = styled.View`
  margin-left: 5%;
`;

export const RatingSection = styled.View`
  padding-left: 60%;
  flex-direction: row;
`;

export const WorkingHoursSection = styled.View`
  flex-direction: row;
`;

export const ReservationSection = styled.View`
  flex-direction: column;
`;

export const DateTimeSection = styled.View`
  flex-direction: column;
`;

export const SectionSeparator = styled.View`
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.theme.colors.colorList.gold};
  margin-left: 10%;
  margin-right: 10%;
`;
export const Rating = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.colorList.black};
  font-weight: bold;
`;

export const Description = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.colorList.grey};
`;

export const Category = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const DateTimeText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  margin-left: 20%;
  margin-right: 20%;
  text-align: center;
`;

export const DateTimeButton = styled(Button)`
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 10px;
`;
