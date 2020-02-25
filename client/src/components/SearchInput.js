import React from "react";
import AsyncSelect from "react-select/async";
import { Image, Grid } from "@chakra-ui/core";

function SearchInput(props) {
  const handleLoadOptions = (inputValue, callback) => {
    fetch(`https://api.jikan.moe/v3/search/anime?q=${inputValue}&page=1`)
      .then(res => res.json())
      .then(({ results }) => {
        const finalResults = results.map(result => ({
          ...result,
          value: result.title,
          label: (
            <Grid templateColumns="50px 1fr" alignItems="center">
              <Image src={result.image_url} size={10} borderRadius={"50%"} />
              <h3>{result.title}</h3>
            </Grid>
          )
        }));
        callback(finalResults);
      });
  };

  return (
    <AsyncSelect
      {...props}
      cacheOptions
      loadOptions={handleLoadOptions}
      placeholder="Search Anime"
    />
  );
}

export default SearchInput;
