import React from "react";

import "./Login.css";
import { loginUrl } from "./spotify";

function Login() {
  return (
    <div className="login">
      {/* spotify Logo */}
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify logo"
      />
      {/* Login with spotify - send user to spofity and spotify will verify the user and logg them in*/}
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
