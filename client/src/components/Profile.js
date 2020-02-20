import React, { Fragment } from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Text,
  Button,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/core";

function Profile({ profile }) {
  const { user } = useSelector(state => state.auth);
  return profile ? (
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
      {user && user._id === profile.user._id ? (
        <Fragment>
          <Link to="/manage">
            <Button mr={4} mb={10} leftIcon="edit">
              Edit Profile
            </Button>
          </Link>
          <Button mb={10} leftIcon="delete">
            Delete Account
          </Button>
        </Fragment>
      ) : null}

      <Tabs size="lg">
        <TabList>
          <Tab>Watchlist</Tab>
          <Tab>Reviews</Tab>
          <Tab>Favorites</Tab>
          <Tab>Lists</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={5}
              marginTop={10}
              marginBottom={10}
            >
              {profile.watchlist.length > 0 &&
                profile.watchlist.map(anime => (
                  <Card anime={anime} key={anime.mal_id} deleteButton={true} />
                ))}
            </Grid>
          </TabPanel>
          <TabPanel>Feature coming soon</TabPanel>
          <TabPanel>Feature coming soon</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  ) : (
    <Spinner />
  );
}

export default Profile;
