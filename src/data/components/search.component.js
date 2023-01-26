import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { ProductsContext } from "../../contexts/products.context";

const SearchContainer = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

const searchBarStyle = {
  backgroundColor: "white",
  borderRadius: 20,
  outlineColor: "grey",
};

export const Search = () => {
  const { keyword, search } = useContext(ProductsContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  return (
    <SearchContainer>
      <Searchbar
        elevation={5}
        iconColor="black"
        placeholderTextColor={"grey"}
        style={searchBarStyle}
        placeholder="Where to..."
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
