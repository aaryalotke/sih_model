import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Routess,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Aboutus from "./Pages/Aboutus";
import Contactus from "./Pages/Contactus";
import Callsidebar from "./Pages/Callsidebar";

const Routes = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav> */}

        <Routess>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />} />
        </Routess>
      </div>
    </Router>
  );
};

export default Routes;
