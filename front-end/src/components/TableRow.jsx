import React from "react";
import { Link } from "react-router-dom";
//svg
import eyeicon from "../assets/images/eye-icon.png";

export const TableRow = ({ movie }) => {
  return (
    <tr key={movie.id}>
      <th scope="row">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="movie"
          width="100"
        />
      </th>
      <td>{movie.title}</td>
      <td>{movie.genre}</td>
      <td>{movie.vote_average}</td>
      <td>{movie.release_date.split("-")[0]}</td>
      <td>
        <Link to={`/movie/${movie.id}`}>
          <img src={eyeicon} alt="edit" className="view-icon" />
        </Link>
      </td>
    </tr>
  );
};
