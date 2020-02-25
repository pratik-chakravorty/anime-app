import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup
} from "@chakra-ui/core";

function Nav() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  return (
    <Box
      backgroundColor="white"
      boxShadow="0 6px 15px rgba(0,0,0,0.09)"
      height="4rem"
      width="full"
      display="flex"
      alignItems="center"
    >
      <div style={{ marginLeft: "60px" }}>
        <Link to="/">
          <Text fontSize="xl">Anime App</Text>
        </Link>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "60px" }}>
        <Link to="/search" className="nav-links">
          Search
        </Link>
        {isAuthenticated ? (
          <Fragment>
            <Link to="/add-post" className="nav-links">
              + Add Post
            </Link>
            <Link to="/users" className="nav-links">
              Users
            </Link>
            <Link to="/allPost" className="nav-links">
              All Posts
            </Link>
            <Menu>
              <MenuButton>Account</MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/dashboard" className="nav-links">
                    Profile
                  </Link>
                </MenuItem>

                <MenuItem>
                  <Link
                    to="/login"
                    className="nav-links"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/register" className="nav-links">
              Register
            </Link>
            <Link to="/login" className="nav-links">
              Login
            </Link>
          </Fragment>
        )}
      </div>
    </Box>
  );
}

export default Nav;
