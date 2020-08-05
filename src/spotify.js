//-> https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// endpoint (i.e we will send user to this link and spotify will take care of login)
export const authEndpoint = "https://accounts.spotify.com/authorize";

// after login (i.e authorized) redirect user back
const redirectUri = "http://localhost:3000/";
//const redirectUri = "https://spotify-clone-9aba1.web.app/";

const clientId = "3cb22f2b9bde444d830db28881624ee0"; // taken from spotify developer accounts

// scopes allows user to do the things mentioned ( give permissions)
// so here also with scope we are giving user permissions to do these things
// ex user-read-currently-playing allowing user to see what they are currently playing
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

// get the accesstoken from url
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1) // #access_token=BQDD6H5YNfyTy&token_type=Bearer&expires_in=3600 -> in substrig(1) -> access_token=BQDD6H5YNfyTy&token_type=Bearer&expires_in=3600
    .split("&") //  0->access_token=BQDD6H5YNfyTy 1->token_type=Bearer&expires_in=3600
    .reduce((initial, item) => {
      let parts = item.split("=");
      //console.log("parts", parts);
      initial[parts[0]] = decodeURIComponent(parts[1]);
      //console.log("initial", initial);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

// %20 for space in ascii code, also response_type=token above means when user is authenticated send me a token
