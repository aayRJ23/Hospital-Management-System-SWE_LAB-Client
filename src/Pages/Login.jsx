import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import "./Login.css"

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component-login login-form-login">
      <h2>Sign In to MedConnect</h2>
      <p>Please Login To Continue</p>
      <p>
        Welcome to MedConnect! Your reliable platform for managing healthcare information.
        Please login to access your account.
      </p>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
          <button type="submit" className="login-btn">Login</button>
        </div>
        <div className="register-link">
          <p>Not Registered?</p>
          <Link to="/register" className="register-now">Register Now</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
