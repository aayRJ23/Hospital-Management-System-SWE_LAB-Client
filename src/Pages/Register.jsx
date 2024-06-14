import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faPhone, faIdCard, faCalendar, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import "./Register.css";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/patient/register",
          { firstName, lastName, email, phone, nic, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setNic("");
    setDob("");
    setGender("");
    setPassword("");
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component-register register-form-register">
      <h2>Sign Up for MedConnect</h2>
      <p>Create an account to join MedConnect</p>
      <p>
        Welcome to MedConnect! Sign up to start managing your healthcare information efficiently.
      </p>
      <form onSubmit={handleRegistration} className="register-form">
        <div className="input-group-register">
          <FontAwesomeIcon icon={faUser} className="icon-register" />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group-register">
          <FontAwesomeIcon icon={faUser} className="icon-register" />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group-register">
          <FontAwesomeIcon icon={faEnvelope} className="icon-register" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group-register">
          <FontAwesomeIcon icon={faPhone} className="icon-register" />
          <input
            type="number"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="input-group-register">
          <FontAwesomeIcon icon={faIdCard} className="icon-register" />
          <input
            type="number"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
        </div>
        <div className="input-group-register">
          <FontAwesomeIcon icon={faCalendar} className="icon-register" />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="input-group-register">
          <FontAwesomeIcon icon={faVenusMars} className="icon-register" />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="input-group-register">
          <FontAwesomeIcon icon={faLock} className="icon-register" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-group-register">
          <button type="button" className="clear-btn-register" onClick={handleClear}>Clear</button>
          <button type="submit" className="register-btn-register">Register</button>
        </div>
        <div className="login-link-register">
          <p>Already Registered?</p>
          <Link to="/login" className="login-now-register">Login Now</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
