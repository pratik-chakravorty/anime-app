import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { Box } from "@chakra-ui/core";
import Card from "./Card";
function Search() {
  const [searchData, setSearchData] = useState({});
  return (
    <Box maxW={800} margin="50px auto">
      <SearchInput
        setSearchData={setSearchData}
        onChange={val => setSearchData(val)}
      />
      {Object.keys(searchData).length > 0 && (
        <div style={{ marginTop: "60px" }}>
          <Card anime={searchData} />
        </div>
      )}
    </Box>
  );
}

export default Search;
