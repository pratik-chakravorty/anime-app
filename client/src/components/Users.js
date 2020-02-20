import React, { useEffect } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { Grid, Box, Text, Avatar } from "@chakra-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../actions/profileActions";

function User() {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(state => state.profile);
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="profiles-container">
      <Text fontSize="5xl">
        <b>Profiles</b>
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={5}>
        {profiles.map((profile, i) => (
          <Link to={`/profile/${profile._id}`} key={profile._id}>
            <Box
              overflow="hidden"
              backgroundColor="white"
              className="card-box"
              padding={10}
              boxShadow="0 6px 15px rgba(0,0,0,0.09)"
              cursor="pointer"
            >
              <Grid templateColumns="50px 1fr" gap={5}>
                <div>
                  <Avatar src={profile.user.avatar} size="md" />
                </div>
                <Text>{profile.user.name}</Text>
              </Grid>
            </Box>
          </Link>
        ))}
      </Grid>
    </div>
  );
}

export default User;
