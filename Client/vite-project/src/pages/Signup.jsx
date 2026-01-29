import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const Signup = ({setuser}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate()

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setuser({
      username,
      email,
      password,
    });

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="containerStyle">
      <div className="img">
        <DotLottieReact
            src="https://lottie.host/a329ed4e-a781-4418-8404-4186194440fe/183mQhm7l2.json"
          loop
          autoplay
          quality="high"
          style={{ width: "900px", height: "500px" }}
          />
      </div>
      <div className="cardStyle">
        <div className="headerStyle">
          <h2 className="titleStyle">Create Account</h2>
          <p className="subtitleStyle">Join our community today</p>
        </div>

        <form onSubmit={handleSignup} className="formStyle">
          <div className="groupStyle">
            <label className="labelStyle">
              <i className="fas fa-user iconStyle"></i>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="inputStyle"
              required
            />
          </div>

          <div className="groupStyle">
            <label className="labelStyle">
              <i className="fas fa-envelope iconStyle"></i>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputStyle"
              required
            />
          </div>

          <div className="groupStyle">
            <label className="labelStyle">
              <i className="fas fa-lock iconStyle"></i>
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputStyle"
              required
              minLength="6"
            />
          </div>

          <div className="groupStyle">
            <label className="labelStyle">
              <i className="fas fa-lock iconStyle"></i>
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="inputStyle"
              required
            />
          </div>

          <button type="submit" className="buttonStyle">
            Create Account
          </button>

          <div className="loginStyle">
            Already have an account?{" "}
            <a href="/login" className="linkStyle">
              Login In here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
