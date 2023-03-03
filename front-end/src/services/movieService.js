import http from "./httpService";
import { endpoint } from "../config.js";
import { genres } from "./genreList";

export async function getAllMovies(page = 1) {
  try {
    const { data: movies } = await http.get(`${endpoint}/movies?page=${page}`);
    return movies;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovie(id) {
  try {
    const { data: movie } = await http.get(`${endpoint}/movies/${id}`);
    return movie;
  } catch (error) {
    console.log(error);
  }
}

export async function search(query, page, year) {
  try {
    const { data: movies } = await http.get(
      `${endpoint}/movies/search/?query=${query}&page=${page}&year=${year}`
    );
    return movies;
  } catch (error) {
    console.log(error);
  }
}

export function getGenres() {
  return genres;
}

const movieService = {
  getAllMovies,
  getGenres,
  search,
  getMovie,
};

export { movieService };
