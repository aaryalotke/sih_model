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

    // <div class="flex flex-col items-center justify-center min-h-screen">
    //   <h2 class="text-2xl mb-4">Login</h2>
    //   <form onSubmit={handleLogin} class="flex flex-col items-center space-y-4">
    //     <input
    //       type="text"
    //       value={emailOrUsername}
    //       onChange={(e) => setEmailOrUsername(e.target.value)}
    //       placeholder="Email or Restaurant Username"
    //       class="border rounded px-4 py-2 w-64"
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //       class="border rounded px-4 py-2 w-64"
    //     />
    //     <button
    //       type="submit"
    //       class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //     >
    //       Login
    //     </button>
    //   </form>
    //   <p class="mt-4">
    //     Don't have an account?{" "}
    //     <a href="/signup" class="text-blue-500">
    //       Sign up here
    //     </a>
    //   </p>
    // </div>

    //updated Login page
    <section class="bg-gray-50 dark:bg-gray-400">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 light:bg-white-5000 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Log in to account
            </h1>
            <form
              class="space-y-4 md:space-y-6 "
              action="#"
              onSubmit={handleLogin}
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-100 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your Email"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required=""
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login to the account
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Signup here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
