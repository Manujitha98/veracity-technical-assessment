import { NextFunction, Request, Response } from "express";
import axios from "axios";

export class MoviesController {
  async getAllMovies(request: Request, response: Response, next: NextFunction) {
    try {
      //fetch a list of movies from api.themoviedb.org and return a list of movies
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=${request.query.page}`
      );
      response.status(200);
      return movies.data;
    } catch (error) {
      response.status(500);
      return { error: "Something went wrong" };
    }
  }

  async searchMovie(request: Request, response: Response, next: NextFunction) {
    const { query, page, year } = request.query;

    try {
      //fetch a list of movies from api.themoviedb.org and return a list of movies
      const movies = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.MOVIES_API_KEY
        }&language=en-US&query=${query}&page=${page ? page : 1}&year=${year}`
      );
      response.status(200);
      return movies.data;
    } catch (error) {
      console.log(error);
      response.status(500);
      return { error: "Something went wrong" };
    }
  }

  async getMovieById(request: Request, response: Response, next: NextFunction) {
    try {
      //fetch a movie from api.themoviedb.org and return a movie
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/${request.params.id}?api_key=${process.env.MOVIES_API_KEY}&language=en-US`
      );
      response.status(200);
      return movies.data;
    } catch (error) {
      if (error.response.status === 404) {
        response.status(404);
        return { error: "Movie not found" };
      }
      response.status(500);
      return { error: "Something went wrong" };
    }
  }
}
