import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
//CSS
import "./homepage.css";
//Services
import { movieService } from "../../services/movieService";
//Components
import { FormSelect } from "../../components/FormSelect";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { FormInput } from "../../components/FormInput";
//Helpers
import { filterMovies } from "../../helpers/filter";
import { mergeMoviesWithGenre } from "../../helpers/mergeMoviesWithGenre";

export const Homepage = () => {
  //search params
  const [searchParams, setSearchParams] = useSearchParams();
  //State
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
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

  //initialize
  useEffect(() => {
    loadMovies();
  }, []);

  //initialize movies and genres
  const loadMovies = async () => {
    //get genres
    const genres = movieService.getGenres();
    setGenreList(genres);
    //get search params
    const search = searchParams.get("search") || "";
    const genre = searchParams.get("genre") || "";
    const rating = searchParams.get("rating") || "";
    const year = searchParams.get("year") || "";
    const order = searchParams.get("order") || "";
    const page = parseInt(searchParams.get("page") || 1);
    //update filter state
    setFilter({ search, genre, rating, year, order });
    setPage(page);
    //get movies
    let response;
    if (search !== "") {
      response = await movieService.search(search, page, year);
    } else {
      response = await movieService.getAllMovies(page);
    }
    const movies = response.results;
    setTotalPages(response.total_pages);
    mergeMoviesWithGenre(movies, genres);
    setMovies(movies);
  };

  const handleSearch = () => {
    //update search params
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    loadMovies();
  };

  //handle pagination change
  const handlePageChange = (page) => {
    //update search params
    searchParams.set("page", page);
    setSearchParams(searchParams);
    setPage(page);
    loadMovies(page);
  };

  //update filter state based on input change
  const handleFilterUpdate = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
    //update search params
    searchParams.set(name, value);
    setSearchParams(searchParams);
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
            value={filter.search}
            onChange={(e) => {
              handleFilterUpdate(e);
            }}
          />
        </div>
        <div className="col-2">
          <FormInput
            type="number"
            name="year"
            min="1900"
            value={filter.year}
            onChangeHandler={handleFilterUpdate}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              handleSearch();
            }}
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
            value={filter.genre}
          />
        </div>
        <div className="col-3">
          <FormInput
            type="number"
            name="rating"
            min="0"
            max="10"
            value={filter.rating}
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
            value={filter.order}
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
          <Pagination
            page={page}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};
