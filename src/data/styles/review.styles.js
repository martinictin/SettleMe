import styled from "styled-components/native";

export const UserTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
`;

export const UserComment = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const UserRated = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: bold;
`;

export const CommentsSection = styled.View`
  margin-left: 5%;
  margin-right: 5%;
`;
