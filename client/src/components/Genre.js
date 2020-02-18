import React, { useEffect } from "react";
import { useDataLoader } from "../helpers/useDataLoader";
import { useDispatch } from "react-redux";
import List from "./List";
import Spin from "./Spinner";
import { fetchAnimeByGenre } from "../actions/fetchAnime";
import { Text, Box } from "@chakra-ui/core";

function Genre(props) {
  const dispatch = useDispatch();
  const genreId = props.match.params.id;
  const genreName = props.match.params.name;
  const [handleShowMore, animes, isLoading, showMoreLoading] = useDataLoader(
    fetchAnimeByGenre,
    genreId
  );
  useEffect(() => {
    dispatch(fetchAnimeByGenre(genreId, 1, null));
  }, [dispatch, genreId]);
  return isLoading ? (
    <Spin />
  ) : (
    <Box>
      <Text fontSize="5xl" textAlign="center">
        <b>{genreName} Anime</b>
      </Text>
      <List
        animes={animes}
        handleShowMore={handleShowMore}
        showMoreLoading={showMoreLoading}
      />
    </Box>
  );
}

export default Genre;
