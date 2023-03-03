import React from "react";
import unchecked from "../assets/images/unchecked.png";
import checked from "../assets/images/checked.png";
import { ReactComponent as DeleteIcon } from "../assets/svgs/trash.svg";

export const WishListRow = ({ item, selectHandler, selected }) => {
  const { movie } = item;
  return (
    <tr key={movie.id}>
      <td>
        <img
          src={selected.includes(movie.id) ? checked : unchecked}
          alt="selected?"
          className="chkd-unchkd"
        />
      </td>
      <td>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="poster"
          className="movieThumbnail"
        />
      </td>
      <td>
        <p className="h4">{`${movie.original_title} - ${
          movie.release_date.split("-")[0]
        } - ${movie.genres.map((genre) => genre.name).join("/")}`}</p>
      </td>
      <td>
        <DeleteIcon id="delete-icon" onClick={() => selectHandler(movie.id)} />
      </td>
    </tr>
  );
};
