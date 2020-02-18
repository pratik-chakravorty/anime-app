import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Text, Button, Grid } from "@chakra-ui/core";

function Profile() {
  const { profile } = useSelector(state => state.profile);
  const { watchlist } = profile;
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
            watchlist.map(anime => <Card anime={anime} key={anime.mal_id} />)}
        </Grid>
      </div>
      <div className="profile-text">
        <Text fontSize="25px">
          <b>Blacklist(0)</b>
        </Text>
      </div>
    </div>
  );
}

export default Profile;
