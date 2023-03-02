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

export function getGenres() {
  return genres;
}

const movieService = {
  getAllMovies,
  getGenres,
};

export { movieService };
