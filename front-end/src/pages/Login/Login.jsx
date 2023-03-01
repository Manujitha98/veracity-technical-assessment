import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

export const Login = () => {
  return (
    <div className="div-center">
      <div className="content login-box">
        <h3>Login</h3>
        <hr />
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1" className="fw-bold">
              Email{" "}
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1" className="fw-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-block btn-primary w-100 mt-md-2">
            Login
          </button>
          <hr />
          <Link
            className="btn btn-block btn-primary w-100 mt-md-2"
            to="/sign-up"
          >
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};
