export const mergeMoviesWithGenre = (movies, genres) => {
  movies.forEach((movie) => {
    movie.genre = movie.genre_ids
      .map((genreId) => {
        return genres.find((genre) => genre.id === genreId).name;
      })
      .join(", ");
  });
  return movies;
};
