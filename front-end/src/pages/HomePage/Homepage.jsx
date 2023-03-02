import React, { useEffect, useState } from "react";
import "./homepage.css";
import { movieService } from "../../services/movieService";
import { FormSelect } from "../../components/FormSelect";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/Pagination";

export const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async (page = 1) => {
    const response = await movieService.getAllMovies(page);
    const movies = response.results;
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

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handlePageChange = (page) => {
    setPage(page);
    initialize(page);
  };

  const handleRatingChang = (rating) => {
    setRating(rating);
  };

  const handleYearChange = (year) => {
    setYear(year);
  };

  const handleOrderChange = (order) => {
    setOrder(order);
  };

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
          <FormSelect data={genreList} setSelection={handleGenreChange} />
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
