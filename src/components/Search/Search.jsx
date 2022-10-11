import React from "react";
import { SearchContainer } from "./Search.styled";
import { useState } from "react";


const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <SearchContainer>
      <input type="text" placeholder="Search" name="search" />
      <button type="submit">Search</button>
    </SearchContainer>
  );
};

export default Search;
