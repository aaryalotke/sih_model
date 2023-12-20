import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { database } from "../firebase";

const Signup = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantUsername, setRestaurantUsername] = useState("");
  //   const history = useHistory();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // try {
    //   await auth().createUserWithEmailAndPassword(database, email, password)
    //   .then((response =>{
    //     console.log("user success")
    //   }))
    //   .catch((err) => {
    //     alert(err.message);
    //   });

    //   const user = auth().currentUser;

    //   await user.updateProfile({
    //     displayName: restaurantUsername,
    //   });

    //   // Create a document in Firestore
    //   await firestore().collection("users").doc(user.uid).set({
    //     email: email,
    //     restaurantUsername: restaurantUsername,
    //   });

    //   console.log("Signed up successfully!");
    // } catch (error) {
    //   console.error(error.message + "error");
    // }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // history.push(
        //   `/RestaurantManagerPage?restaurantName=${restaurantUsername}`
        // );
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    // <div>
    //   <h2>Signup</h2>
    //   <form onSubmit={handleSignup}>
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Email"
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <input
    //       type="text"
    //       value={restaurantUsername}
    //       onChange={(e) => setRestaurantUsername(e.target.value)}
    //       placeholder="Restaurant Username"
    //     />
    //     <button type="submit">Signup</button>
    //   </form>
    //   <p>
    //     Already have an account? <Link to="/login">Login here</Link>
    //   </p>
    // </div>

    //gpt code

    // <div class="flex flex-col items-center justify-center min-h-screen top-0">
    //   <h2 class="text-2xl mb-4">Signup</h2>
    //   <form
    //     onSubmit={handleSignup}
    //     class="flex flex-col items-center space-y-4"
    //   >
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Email"
    //       class="border rounded px-4 py-2 w-64"
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //       class="border rounded px-4 py-2 w-64"
    //     />
    //     <input
    //       type="text"
    //       value={restaurantUsername}
    //       onChange={(e) => setRestaurantUsername(e.target.value)}
    //       placeholder="Restaurant Username"
    //       class="border rounded px-4 py-2 w-64"
    //     />
    //     <button
    //       type="submit"
    //       class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //     >
    //       Signup
    //     </button>
    //   </form>
    //   <p class="mt-4">
    //     Already have an account?{" "}
    //     <a href="/login" class="text-blue-500">
    //       Login here
    //     </a>
    //   </p>
    // </div>
    //updated tailwind css
    <section class="bg-gray-50 dark:bg-gray-400">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 light:bg-white-5000 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Create an account
            </h1>
            <form
              class="space-y-4 md:space-y-6 "
              action="#"
              onSubmit={handleSignup}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="terms"
                    class="font-light text-gray-500 dark:text-gray-500"
                  >
                    I accept the{" "}
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
