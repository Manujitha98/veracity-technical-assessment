import React, { useEffect, useState } from "react";
import "./homepage.css";
import { movieService } from "../../services/movieService";
import { FormSelect } from "../../components/FormSelect";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { FormInput } from "../../components/FormInput";
import { filterMovies } from "../../helpers/filter";
import { mergeMoviesWithGenre } from "../../helpers/mergeMoviesWithGenre";

export const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
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
  }, []);

  //initialize movies and genres
  const initialize = async (page = 1) => {
    const { results: movies } = await movieService.getAllMovies(page);
    const genres = movieService.getGenres();
    mergeMoviesWithGenre(movies, genres);
    setMovies(movies);
    setGenreList(genres);
  };

  //handle pagination change
  const handlePageChange = (page) => {
    if (filter.search === "") initialize(page);
    else handleSearch(page);
    setPage(page);
  };

  //update filter state based on input change
  const handleFilterUpdate = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
    //trigger initialization if the search is empty
    if (name === "search" && value === "") {
      initialize();
    }
  };

  //search movies based on search term and year if provided. can be called from pagination or search button
  const handleSearch = async (pageValue) => {
    if (filter.search === "") return;
    const { results: movies } = await movieService.search(
      filter.search,
      pageValue ? pageValue : page,
      filter.year
    );
    mergeMoviesWithGenre(movies, genreList);
    setMovies(movies);
  };

  //filter movies based on genre and rating
  useEffect(() => {
    const filteredMovies = filterMovies(filter, movies);
    setFilteredMovies(filteredMovies);
  }, [filter, movies]);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-8">
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
          <FormInput
            type="number"
            name="year"
            onChangeHandler={handleFilterUpdate}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary w-100"
            onClick={() => handleSearch()}
          >
            Search
          </button>
        </div>
      </div>
      <hr />
      <div className="row mt-4">
        <div className="col-3">
          <label>Genre :</label>
        </div>
        <div className="col-3">
          <label>Minimum Rating :</label>
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
            min="0"
            max="10"
            onChangeHandler={handleFilterUpdate}
          />
        </div>
        <div className="col-3">
          <FormSelect
            data={[
              { id: "title.asc", name: "Title Alphabetical " },
              { id: "title.desc", name: "Title Reverse" },
            ]}
            setSelection={handleFilterUpdate}
            name="order"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Table movies={filteredMovies} />
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
