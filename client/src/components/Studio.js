import React, { useEffect } from "react";
import { useDataLoader } from "../helpers/useDataLoader";
import { useDispatch } from "react-redux";
import List from "./List";
import Spin from "./Spinner";
import { fetchStudioAnime } from "../actions/fetchAnime";
import { Text, Box } from "@chakra-ui/core";

function Studio(props) {
  const dispatch = useDispatch();
  const studioId = props.match.params.id;
  const studioName = props.match.params.name;
  const [handleShowMore, animes, isLoading, showMoreLoading] = useDataLoader(
    fetchStudioAnime,
    studioId
  );
  useEffect(() => {
    dispatch(fetchStudioAnime(studioId, 1, null));
  }, [dispatch, studioId]);
  return isLoading ? (
    <Spin />
  ) : (
    <Box>
      <Text fontSize="5xl" textAlign="center">
        <b>Studio {studioName}</b>
      </Text>
      <List
        animes={animes}
        handleShowMore={handleShowMore}
        showMoreLoading={showMoreLoading}
      />
    </Box>
  );
}

export default Studio;
