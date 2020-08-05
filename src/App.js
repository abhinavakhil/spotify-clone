import React, { useEffect, useState } from "react";

import "./App.css";
import Login from "./Login";
import Player from "./Player";

import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi(); // creating an instance of api in our app

function App() {
  // const [token, setToken] = useState(null);
  // this destructure user is same as -> dataLayer.user
  const [{ user, token }, dispatch] = useDataLayerValue();

  //BEM
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = ""; // make that accesstoken in url to empty so that it doesnot show in url for security reason

    const _token = hash.access_token;
    if (_token) {
      // dispatching action for token
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token); // giving access token to spotify

      // get users account- it returns a user
      spotify.getMe().then((user) => {
        // dispatching action - with context api
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      // get user playlist
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      // get your discover weekly field
      // open real spotify and open the discover wekkly and
      //from url in browser copy the id like this one(6BEasSOrFkth5Kkcd1Z9Tt)
      spotify.getPlaylist("6BEasSOrFkth5Kkcd1Z9Tt").then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        });
      });
    }
  }, [token, dispatch]);

  //console.log(user); // i.e getting this (user) from store (useDataLayerValue)
  //console.log(":rocket", token);
  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
