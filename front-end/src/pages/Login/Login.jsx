import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import "./login.css";

export const Login = () => {
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      await authService.login(credentials.email, credentials.password);
      window.location.href = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Invalid email or password.");
      }
    }
  };
  return (
    <div className="div-center">
      <div className="content login-box">
        <h3>Login</h3>
        <hr />
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="fw-bold">
            Email{" "}
          </label>
          <input
            value={credentials.email}
            onChange={(e) => handleInputChange(e)}
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="fw-bold">
            Password
          </label>
          <input
            value={credentials.password}
            onChange={(e) => handleInputChange(e)}
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
          />
        </div>
        <button
          className="btn btn-block btn-primary w-100 mt-md-2"
          onClick={handleSubmit}
          disabled={!credentials.email || !credentials.password}
        >
          Login
        </button>
        <hr />
        <Link className="btn btn-block btn-primary w-100 mt-md-2" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
