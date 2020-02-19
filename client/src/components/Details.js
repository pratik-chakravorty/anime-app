import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import {
  addWatchList,
  removeWatchlist,
  getCurrentProfile
} from "../actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import {
  Grid,
  Box,
  Image,
  Text,
  Badge,
  Button,
  Alert,
  AlertIcon
} from "@chakra-ui/core";
import { fetchAnimeDetails } from "../actions/fetchAnime";
import { pilColorMap } from "../utils/pilMap";

function Details(props) {
  const dispatch = useDispatch();
  const { anime, isLoading } = useSelector(state => state.animeState);
  const { profile } = useSelector(state => state.profile);
  const alerts = useSelector(state => state.alerts);
  const { user } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(fetchAnimeDetails(props.match.params.id));
    dispatch(getCurrentProfile());
  }, [props.match.params.id, dispatch]);

  const displayUrl = url => {
    if (url) {
      let newUrl = url.split("=");
      newUrl[newUrl.length - 1] = "0";
      return newUrl.join("=");
    }
  };
  const handleWatchlistAdd = () => {
    const values = {
      mal_id: anime.mal_id,
      title: anime.title,
      image_url: anime.image_url,
      episodes: anime.episodes
    };
    dispatch(addWatchList(values));
  };

  const displayAlerts = alert => (
    <Alert status={alert.alertType} key={alert.id}>
      <AlertIcon />
      {alert.msg}
    </Alert>
  );
  const isAddedToWatchList = () =>
    profile.watchlist &&
    profile.watchlist.some(item => item.mal_id === anime.mal_id);
  return isLoading || Object.keys(anime).length === 0 ? (
    <Spinner />
  ) : (
    <Box maxW={1200} margin="50px auto">
      {alerts && alerts.length > 0 && alerts.map(alert => displayAlerts(alert))}
      <Grid templateColumns="250px 1fr" gap={10}>
        <Box>
          <Image src={anime.image_url} paddingRight="2em" borderRadius="4px" />
          <Text fontSize="25px">
            <b>Status</b>
          </Text>
          <Text fontSize="15px" lineHeight="1.5rem">
            {anime.status}
          </Text>
          <Text fontSize="25px">
            <b>Source</b>
          </Text>
          <Text fontSize="15px" lineHeight="1.5rem">
            {anime.source}
          </Text>
          {user && (
            <Fragment>
              {isAddedToWatchList() ? (
                "Added to Watchlist"
              ) : (
                <Button
                  mt={2}
                  mb={4}
                  width="240px"
                  variant="outline"
                  variantColor="black"
                  onClick={handleWatchlistAdd}
                >
                  Add to Watchlist
                </Button>
              )}
              {isAddedToWatchList() && (
                <Button
                  variant="outline"
                  variantColor="red"
                  onClick={() => dispatch(removeWatchlist(anime.mal_id))}
                >
                  Delete from Watchlist
                </Button>
              )}
            </Fragment>
          )}
        </Box>
        <Box>
          <Text fontSize="5xl">
            <b>{anime.title}</b>
          </Text>
          <Text fontSize="15px" lineHeight="1.5rem">
            {anime.synopsis}
          </Text>
          <Text fontSize="25px">
            <b>
              Studio
              {anime && anime.studios && anime.studios.length > 1 ? "s" : ""}
            </b>
          </Text>
          {anime &&
            anime.studios &&
            anime.studios.map(studio => (
              <Text
                fontSize="15px"
                key={studio.mal_id}
                lineHeight="1.5rem"
                marginBottom={4}
              >
                <Link
                  to={`/studio/${studio.name}/${studio.mal_id}`}
                  className="link-style"
                >
                  {studio.name}
                </Link>
              </Text>
            ))}
          <Text fontSize="25px">
            <b>Episodes</b>
          </Text>
          <Text fontSize="15px" marginBottom={4}>
            {anime.episodes}
          </Text>
          <Text fontSize="25px">
            <b>Aired</b>
          </Text>
          <Text fontSize="15px" marginBottom={4}>
            {anime.aired.string}
          </Text>
          <Text fontSize="25px">
            <b>Genres</b>
          </Text>
          <Box className="genre-container" marginBottom={10}>
            {anime.genres.map(genre =>
              pilColorMap.hasOwnProperty(genre.name) ? (
                <Link
                  key={genre.mal_id}
                  to={`/genre/${genre.name}/${genre.mal_id}`}
                >
                  <Badge
                    fontSize="lg"
                    borderRadius="20px"
                    padding="5px 9px"
                    variantColor={pilColorMap[genre.name]}
                  >
                    {genre.name}
                  </Badge>
                </Link>
              ) : (
                <Link
                  key={genre.mal_id}
                  to={`/genre/${genre.name}/${genre.mal_id}`}
                >
                  <Badge
                    fontSize="lg"
                    borderRadius="20px"
                    padding="5px 9px"
                    variantColor={pilColorMap["others"]}
                  >
                    {genre.name}
                  </Badge>
                </Link>
              )
            )}
          </Box>
          <Text fontSize="25px" marginBottom={3}>
            <b>Similar Anime Recommendations:</b>
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={5} marginBottom={10}>
            {anime.recommendations.map(anime => (
              <Card anime={anime} key={anime.mal_id} />
            ))}
          </Grid>
          <Text fontSize="25px">
            <b>Trailer</b>
          </Text>
          <iframe
            style={{ marginTop: "10px" }}
            src={displayUrl(anime.trailer_url)}
            width="640"
            height="500"
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen
            title="video"
          />
        </Box>
      </Grid>
    </Box>
  );
}

export default Details;
