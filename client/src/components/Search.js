import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { searchAnime } from "../actions/searchAction";
import { Box } from "@chakra-ui/core";
import Card from "./Card";
function Search() {
  const [searchData, setSearchData] = useState({});
  const dispatch = useDispatch();
  const { searchedResults } = useSelector(state => state.animeState);
  const searchedTerm =
    searchedResults &&
    searchedResults.map(anime => ({
      ...anime,
      value: anime.title,
      label: anime.title
    }));
  const handleInputChange = inputValue => {
    if (inputValue.length > 3) {
      dispatch(searchAnime(inputValue));
    }
  };
  return (
    <Box maxW={800} margin="50px auto">
      <Select
        options={searchedTerm}
        placeholder="Search Anime"
        onChange={val => setSearchData(val)}
        onInputChange={handleInputChange}
      />
      {Object.keys(searchData).length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Card anime={searchData} />
        </div>
      )}
    </Box>
  );
}

export default Search;
