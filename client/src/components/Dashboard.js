import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../actions/profileActions";
import { Text, Alert, AlertIcon, Box, Button, Avatar } from "@chakra-ui/core";

function Dashboard() {
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alerts);
  const { profile } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);
  const displayAlerts = alert => (
    <Alert status={alert.alertType} key={alert.id}>
      <AlertIcon />
      {alert.msg}
    </Alert>
  );
  return (
    <div className="container">
      {alerts && alerts.length > 0 && alerts.map(alert => displayAlerts(alert))}
      <div className="img-center">
        <Avatar size="2xl" src={user && user.avatar} mt={10} />
      </div>
      <Text fontSize="5xl" textAlign="center">
        <b>{user && user.name}</b>
      </Text>
      {Object.keys(profile).length > 0 ? (
        <Profile />
      ) : (
        <Box className="profile-container">
          <Text fontSize="xl" textAlign="center" mb={5}>
            Please create your profile
          </Text>
          <Link to="/profile/manage" className="profile-button">
            <Button>Create Profile</Button>
          </Link>
        </Box>
      )}
    </div>
  );
}

export default Dashboard;
