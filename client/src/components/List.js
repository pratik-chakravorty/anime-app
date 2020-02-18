import React from "react";
import Card from "./Card";
import { Box, Grid, Button } from "@chakra-ui/core";

function List({ animes, handleShowMore, showMoreLoading }) {
  return (
    <Box maxW={1200} margin="50px auto">
      <Grid templateColumns="repeat(3, 1fr)" gap={20}>
        {animes.map(anime => (
          <Card key={anime.mal_id} anime={anime} />
        ))}
      </Grid>
      <Box display="grid" marginTop={20}>
        {animes.length > 0 && (
          <Button
            borderRadius={4}
            backgroundColor="white"
            isLoading={showMoreLoading}
            border="1px solid black"
            onClick={handleShowMore}
          >
            Show More
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default List;
