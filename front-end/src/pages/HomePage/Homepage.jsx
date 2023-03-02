import React, { useEffect, useState } from "react";
import "./homepage.css";
import { movieService } from "../../services/movieService";
import { FormSelect } from "../../components/FormSelect";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { FormInput } from "../../components/FormInput";

export const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    search: "",
    genre: "",
    rating: "",
    year: "",
    order: "",
  });

  useEffect(() => {
    initialize();
  }, [filter.genre, filter.rating, filter.year, filter.order]);

  const initialize = async (page = 1) => {
    const { results: movies } = await movieService.getAllMovies(page);
    const genres = movieService.getGenres();
    movies.forEach((movie) => {
      movie.genre = movie.genre_ids
        .map((genreId) => {
          return genres.find((genre) => genre.id === genreId).name;
        })
        .join(", ");
    });
    setMovies(movies);
    setGenreList(genres);
  };

  const handlePageChange = (page) => {
    setPage(page);
    initialize(page);
  };

  const handleFilterUpdate = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
    console.log(filter);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-10">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Search"
            name="search"
            onChange={(e) => {
              handleFilterUpdate(e);
            }}
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
          <FormSelect
            data={genreList}
            setSelection={handleFilterUpdate}
            name="genre"
          />
        </div>
        <div className="col-3">
          <FormInput
            type="number"
            name="rating"
            onChangeHandler={handleFilterUpdate}
          />
        </div>
        <div className="col-3">
          <FormInput
            type="number"
            name="year"
            onChangeHandler={handleFilterUpdate}
          />
        </div>
        <div className="col-3">
          <FormSelect
            data={[
              { id: "title.ascending", name: "Title ASC" },
              { id: "title.descending", name: "Title DSC" },
            ]}
            setSelection={handleFilterUpdate}
            name="order"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Table movies={movies} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Pagination page={page} handlePageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};
