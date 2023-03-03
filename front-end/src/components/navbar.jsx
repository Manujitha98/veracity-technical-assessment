import { Link, Outlet } from "react-router-dom";
import React from "react";

//images
import LogoutImage from "../assets/images/logout.png";
//svg
import { ReactComponent as FavoriteIcon } from "../assets/svgs/favorites.svg";

export const NavBar = ({ user }) => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <Link className="navbar-brand ms-5" to="/">
          Movies
        </Link>
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
                <Link className="nav-link make-red " to="/wish-list">
                  <FavoriteIcon className="profileButton make-red" />
                  {`${user.firstName} ${user.lastName}`}
                </Link>
                <li className="nav-item">
                  <Link className="nav-link ps-5 me-4 " to="/logout">
                    <img
                      src={LogoutImage}
                      alt=""
                      className="logout-button"
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
