import React from "react";
import "./homepage.css";
import eyeicon from "../../assets/images/eye-icon.png";

export const Homepage = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-10">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Search"
          />
        </div>
        <div className="col-2">
          <button className="btn btn-primary w-100">Search</button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-3">
          <label>Genre :</label>
        </div>
        <div className="col-3">
          <label>Rating :</label>
        </div>
        <div className="col-3">
          <label>Year :</label>
        </div>
        <div className="col-3">
          <label>Order By :</label>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <select className="form-select">
            <option value="">Select</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Biography">Biography</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
          </select>
        </div>
        <div className="col-3">
          <select className="form-select">
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="col-3">
          <select className="form-select">
            <option value="">Select</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
          </select>
        </div>
        <div className="col-3">
          <select className="form-select">
            <option value="">Select </option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Rating</th>
                <th scope="col">Year</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <img
                    src="https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg"
                    alt="Avatar"
                    className="img-thumbnail"
                  />
                </th>
                <td>Harry Potter and the Deathly Hallows: Part 2</td>
                <td>Adventure, Drama, Fantasy</td>
                <td>8.1</td>
                <td>2011</td>
                <td>
                  <img src={eyeicon} alt="edit" className="view-icon" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
