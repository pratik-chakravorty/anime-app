import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Nav from "./components/layout/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthRoute from "./components/routing/AuthRoute";
import { loadUser } from "./actions/authActions";
import AnimeList from "./components/AnimeList";
import Users from "./components/Users";
import Genre from "./components/Genre";
import Dashboard from "./components/Dashboard";
import Studio from "./components/Studio";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfileForm from "./components/ProfileForm";
import Details from "./components/Details";
import setAuthToken from "./helpers/setAuthToken";
import Search from "./components/Search";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={AnimeList} />
        <AuthRoute exact path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile/:id" component={Dashboard} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/manage" component={ProfileForm} />
        <AuthRoute exact path="/login" component={Login} />
        <Route path="/details/:id" component={Details} />
        <Route path="/search" component={Search} />
        <Route path="/genre/:name/:id" component={Genre} />
        <Route path="/studio/:name/:id" component={Studio} />
      </Switch>
    </Router>
  );
}

export default App;
