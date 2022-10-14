import React from "react";
import { SearchContainer } from "./Search.styled";
import { ButtonContainer } from "./Search.styled";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <SearchContainer>
        <input
          type="text"
          placeholder="search"
          name="search"
          value={search}
          onClick={(e) => e.target.value}
        />
        <ButtonContainer>
          <button type="submit">Search</button>
        </ButtonContainer>
      </SearchContainer>
    </div>
  );
};

export default Search;
