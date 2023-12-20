import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // try {
    //   const userCredential = await auth.signInWithEmailAndPassword(
    //     emailOrUsername,
    //     password
    //   );

    //   console.log("Logged in successfully!");
    //   console.log("User: ", userCredential.user);
    // } catch (error) {
    //   console.error(error.message);
    // }

    const auth = getAuth();

    //new code
    signInWithEmailAndPassword(auth, emailOrUsername, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={handleLogin}>
    //     <input
    //       type="text"
    //       value={emailOrUsername}
    //       onChange={(e) => setEmailOrUsername(e.target.value)}
    //       placeholder="Email or Restaurant Username"
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    //   <p>
    //     Don't have an account? <Link to="/signup">Sign up here</Link>
    //   </p>
    // </div>

    //gpt code

    <div class="flex flex-col items-center justify-center min-h-screen">
      <h2 class="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} class="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="Email or Restaurant Username"
          class="border rounded px-4 py-2 w-64"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          class="border rounded px-4 py-2 w-64"
        />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
      <p class="mt-4">
        Don't have an account?{" "}
        <a href="/signup" class="text-blue-500">
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default Login;
