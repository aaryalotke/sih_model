import React from "react";
import "./Auth.css";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setIsAuth(true);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="Auth">
      <div className="card">
        <h2>Chat App</h2>
        <p>
          Welcome to the Chat App! Sign in with Google to continue. Connect and
          Contribute.
        </p>

        <button id="donation" onClick={signInWithGoogle}>
          Sign in with google
        </button>
      </div>
    </div>
  );
};

export default Auth;
