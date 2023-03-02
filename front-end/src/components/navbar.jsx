import { Link, Outlet } from "react-router-dom";
import React from "react";

//images
import LogoutImage from "../assets/images/logout.png";
//svg
import { ReactComponent as FavoriteIcon } from "../assets/svgs/favorites.svg";

export const NavBar = ({ user }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Movies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">
                    Sign up
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                {" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/wish-list">
                    <FavoriteIcon id="favIconSVG" />
                  </Link>
                </li>
                <li className="nav-item pe-5 pt-2">{`${user.firstName} ${user.lastName}`}</li>
                <li className="nav-item">
                  <Link className="nav-link ps-5" to="/logout">
                    <img
                      src={LogoutImage}
                      alt=""
                      className="rounded-circle"
                      style={{ width: "30px" }}
                    />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
