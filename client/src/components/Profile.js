import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeWatchlist } from "../actions/profileActions";
import { Text, Button, Grid } from "@chakra-ui/core";

function Profile() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  const { watchlist } = profile;
  const handleWatchlistRemove = id => dispatch(removeWatchlist(id));
  return (
    <div>
      <div className="profile-card">
        <Text fontSize="25px">
          <b>About Me</b>
        </Text>
        <Text fontSize="20px" fontWeight="light" lineHeight="1.5rem">
          {profile.aboutMe}
        </Text>
      </div>
      <div className="profile-card">
        <Text fontSize="25px">
          <b>Location</b>
        </Text>
        <Text fontSize="20px" fontWeight="light" lineHeight="1.5rem">
          {profile.location}
        </Text>
      </div>
      <Link to="/profile/manage">
        <Button mr={4} mb={10} leftIcon="edit">
          Edit Profile
        </Button>
      </Link>
      <Button mb={10} leftIcon="delete">
        Delete Account
      </Button>
      <div className="profile-text">
        <Text fontSize="25px">
          <b>
            Watchlist ({watchlist.length > 0 ? `${watchlist.length}` : `0`})
          </b>
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={5} marginBottom={10}>
          {watchlist.length > 0 &&
            watchlist.map(anime => (
              <Card
                anime={anime}
                key={anime.mal_id}
                deleteButton={true}
                handleWatchlistRemove={handleWatchlistRemove}
              />
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default Profile;
