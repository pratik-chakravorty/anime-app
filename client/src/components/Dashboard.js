import React, { useEffect } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile, getProfileById } from "../actions/profileActions";
import { Text, Alert, AlertIcon, Box, Button, Avatar } from "@chakra-ui/core";

function Dashboard(props) {
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alerts);
  const { profile, loading } = useSelector(state => state.profile);
  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getProfileById(props.match.params.id));
    } else {
      dispatch(getCurrentProfile());
    }
  }, [dispatch, props.match.params.id]);
  const displayAlerts = alert => (
    <Alert status={alert.alertType} key={alert.id}>
      <AlertIcon />
      {alert.msg}
    </Alert>
  );
  return loading || profile.user === undefined ? (
    <Spinner />
  ) : (
    <div className="container">
      {alerts && alerts.length > 0 && alerts.map(alert => displayAlerts(alert))}
      <div className="img-center">
        <Avatar size="2xl" src={profile.user.avatar} mt={10} />
      </div>
      <Text fontSize="5xl" textAlign="center">
        <b>{profile.user.name}</b>
      </Text>
      {Object.keys(profile).length > 0 ? (
        <Profile profile={profile} />
      ) : (
        <Box className="profile-container">
          <Text fontSize="xl" textAlign="center" mb={5}>
            Please create your profile
          </Text>
          <Link to="/manage" className="profile-button">
            <Button>Create Profile</Button>
          </Link>
        </Box>
      )}
    </div>
  );
}

export default Dashboard;
