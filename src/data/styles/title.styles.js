import styled from "styled-components/native";

export const TitleContainer = styled.View`
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.colorList.white};
`;

export const TitleText = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: bold;
`;
