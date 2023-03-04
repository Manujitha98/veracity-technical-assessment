import React from "react";
//components
import { TableRow } from "./TableRow";

export const Table = ({ movies }) => {
  return (
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
        {movies.map((movie) => {
          return <TableRow movie={movie} key={movie.id} />;
        })}
      </tbody>
    </table>
  );
};
