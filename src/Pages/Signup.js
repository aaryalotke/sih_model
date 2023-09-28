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

    <div class="flex flex-col items-center justify-center min-h-screen">
      <h2 class="text-2xl mb-4">Signup</h2>
      <form
        onSubmit={handleSignup}
        class="flex flex-col items-center space-y-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          class="border rounded px-4 py-2 w-64"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          class="border rounded px-4 py-2 w-64"
        />
        <input
          type="text"
          value={restaurantUsername}
          onChange={(e) => setRestaurantUsername(e.target.value)}
          placeholder="Restaurant Username"
          class="border rounded px-4 py-2 w-64"
        />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </button>
      </form>
      <p class="mt-4">
        Already have an account?{" "}
        <a href="/login" class="text-blue-500">
          Login here
        </a>
      </p>
    </div>
  );
};

export default Signup;
