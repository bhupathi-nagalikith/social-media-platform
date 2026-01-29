import React, { useState } from "react";
import './Login.css'
import { Navigate, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Login = ({obj,setlogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [login,setlogin]=useState(false);
  const navigate=useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
     if (!obj) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (obj.email === email && obj.password === password) {
      setlogin(true);
      navigate('/home')
      alert("Login successful");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="img">
        <div>
        <DotLottieReact
           src="https://lottie.host/31780b29-90da-4e9c-9a49-11c7a8266cee/34HIp2qGdz.json"
          loop
          autoplay
          quality="high"
          style={{ width: "1000px", height: "600px" }}
        />
      </div>
      </div>
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please enter your credentials</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox" />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-button">
            Login In
          </button>

          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign up here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;