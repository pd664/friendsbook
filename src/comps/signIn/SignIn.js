import React, { useState } from "react";
import '../../static/signin/signin.css'
import axios from "axios";
import { Link } from 'react-router-dom'
import { setUserSession } from '../../utils/token';
import {  useNavigate } from 'react-router-dom';


function SignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const clickHandler = () => {
    setLoading(true);
    axios
      .post("http://localhost:4000/signin", {
        username: username,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        navigate('/')
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
  };

  return (
    <div id="signin" className="d-flex flex-column justify-content-center align-items-center mt-0">
      <span className="signup_name"><h2>Friendsbook</h2></span>
      <div className="signincontainer w-25 container">
        <div className="signinbody d-flex flex-column align-items-center container">
          <div className="heading mt-4">
            <h1>SIGN IN</h1>
          </div>
          <div className="d-flex flex-column mt-5 w-75">
            <form>
              <input
                className="input w-100 input_signin"
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                className="w-100 mt-5 input_signin"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                className="w-100 mt-5 signin_btn"
                name="signin"
                type="button"
                value={loading ? "Loading..." : "SIGN IN"}
                onClick={clickHandler}
                disabled={loading}
              />
              {error && (
                <>
                  <small style={{ color: "red" }}>{error}</small>
                  <br />
                </>
              )}
              <br />
              <small>
                <span></span> OR
              </small>
              <br />
              <small>
                <span id="acc">Not Have an account? </span>
              </small>
              <Link to="/signup">
              <input className="w-100 mt-2 mb-5 signin_btn" type="button" value={loading ? 'Loading...' : 'SIGN UP'}  disabled={loading} />
            
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
