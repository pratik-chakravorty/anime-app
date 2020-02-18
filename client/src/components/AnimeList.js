import React, { useEffect } from "react";
import { useDataLoader } from "../helpers/useDataLoader";
import Spin from "./Spinner";
import List from "./List";
import { useDispatch } from "react-redux";
import { fetchAnime } from "../actions/fetchAnime";

function AnimeList() {
  const dispatch = useDispatch();
  const [handleShowMore, animes, isLoading, showMoreLoading] = useDataLoader(
    fetchAnime
  );
  useEffect(() => {
    dispatch(fetchAnime(1, null));
  }, [dispatch]);
  return isLoading ? (
    <Spin />
  ) : (
    <List
      animes={animes}
      handleShowMore={handleShowMore}
      showMoreLoading={showMoreLoading}
    />
  );
}

export default AnimeList;
