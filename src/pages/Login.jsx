import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  // hardcoded user credentials
  const userCredentials = {
    username: "admin",
    password: "password",
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    // check if entered values match admin credentials
    if (
      username.value === userCredentials.username &&
      password.value === userCredentials.password
    ) {
      // redirect to homepage
      navigate("/home");
    } else {
      // handle incorrect credentials
      alert("Incorrect username or password");
    }
  };

  return (
    <>
      <div className="background-overlay"></div>

      <div className="login">
        <h1>Dashboard Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            <h3 style={{ marginBottom: "10px" }}> Username:</h3>

            <input
              onMouseEnter={(e) =>
                (e.target.style.borderColor = " rgb(255, 255, 255)")
              }
              onMouseLeave={(e) =>
                (e.target.style.borderColor = "rgb(0, 0, 0)")
              }
              className="login-input"
              type="text"
              name="username"
            />
          </label>
          <br />
          <label className="login-label">
            <h3 style={{ marginBottom: "10px" }}> Password:</h3>
            <input
              onMouseEnter={(e) =>
                (e.target.style.borderColor = " rgb(255, 255, 255)")
              }
              onMouseLeave={(e) =>
                (e.target.style.borderColor = "rgb(0, 0, 0)")
              }
              className="login-input"
              type="password"
              name="password"
            />
          </label>
          <br />
          <input className="login-submit" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Login;
