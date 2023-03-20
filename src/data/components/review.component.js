import React from "react";

import {
  CommentsSection,
  UserTitle,
  UserComment,
  UserRated,
} from "../styles/review.styles";

export const Review = ({ review = {} }) => {
  const { rated_by = "User name", comment = "Comment", rating = 4.5 } = review;

  return (
    <CommentsSection>
      <UserTitle>{rated_by}</UserTitle>
      <UserRated>{rating}</UserRated>
      <UserComment>{comment}</UserComment>
    </CommentsSection>
  );
};
