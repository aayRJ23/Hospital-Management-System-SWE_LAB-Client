import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { firstName, lastName, email, phone, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        toast.success(res.data.message);
        handleClear();
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="message-form-container">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleMessage}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Mobile Number</label>
            <input
              type="number"
              id="phone"
              placeholder="Enter your Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={7}
              placeholder="Enter your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="form-buttons">
          <button type="button" onClick={handleClear} className="clear-button">Clear</button>
          <button type="submit" className="send-button">Send</button>
        </div>
      </form>
      <img src="/Vector.png" alt="vector" className="form-vector-image" />
    </div>
  );
};

export default MessageForm;
