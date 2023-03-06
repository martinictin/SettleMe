import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { ProductsContext } from "../../contexts/products.context";

const SearchContainer = styled.View`
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.colorList.white};
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
