import _ from "lodash";
// Filter movies by genre, rating and order
export const filterMovies = (filter, movies) => {
  let filteredMovies = movies;
  if (filter.genre !== "") {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre_ids.includes(parseInt(filter.genre))
    );
  }
  if (filter.rating !== "") {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.vote_average >= filter.rating
    );
  }
  if (filter.order !== "") {
    filteredMovies = _.orderBy(
      filteredMovies,
      [filter.order.split(".")[0]],
      [filter.order.split(".")[1]]
    );
  }

  return filteredMovies;
};
