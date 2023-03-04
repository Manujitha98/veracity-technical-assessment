import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Services
import { movieService } from "../../services/movieService";
import { addToWishList } from "../../services/userService";
//Context
import UserContext from "../../context/UserContext";
//Components
import ReactStars from "react-rating-stars-component";
import LinkButton from "../../components/LinkButton";
//misc
import { toast } from "react-toastify";
//css
import "./moviedetails.css";

export const MovieDetails = () => {
  const navigate = useNavigate();
  //movie id
  const movieId = useParams().id;
  //movie state
  const [movie, setMovie] = useState();
  //load user context
  const { user } = useContext(UserContext);

  const getMovieDetails = async () => {
    const movie = await movieService.getMovie(movieId);
    setMovie(movie);
  };

  const handleAddToWishList = async () => {
    try {
      await addToWishList(movieId);
      toast.success("Movie added to wish list");
    } catch (ex) {
      console.log(ex);
      toast.error(ex.response.data);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <div className="container">
      {movie && (
        <div className="row">
          <div className="col-6 h-100 poster-holder">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movie"
              width="80%"
              height={movie.poster_path ? "100%" : "0"}
            />
          </div>
          <div className="col-6">
            <div className="row">
              <p className="display-5">{movie.title}</p>
            </div>
            <div className="row">
              <div className="col-md-8">
                <p className="text-muted display-6">
                  {movie.release_date.split("-")[0]}
                </p>
                <p className="h4">
                  {movie.genres.map((genre) => genre.name).join("/")}
                </p>
              </div>
              <div className="col-md-4">
                {user && (
                  <button
                    className="btn btn-primary"
                    onClick={handleAddToWishList}
                  >
                    Add to WishList
                  </button>
                )}
                {!user && (
                  <LinkButton className="btn btn-primary" to="/login">
                    Login to add to wishlist
                  </LinkButton>
                )}
              </div>
            </div>
            <p className="h4 mt-md-5 fw-bold">Reviews</p>
            <div className="row">
              <div className="col-md-6">
                <p className="display-6 mt-md-4 fw-bold">
                  {movie.vote_average} <b className="custom-muted-text">/10</b>{" "}
                </p>
              </div>
              <div className="col-md-6 pt-md-4">
                <ReactStars
                  count={5}
                  value={movie.vote_average / 2}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
              </div>
            </div>
            <div className="row">
              <p className="h3 mt-md-5">Synopsys</p>
              <p className="fw-bold">{movie.overview}</p>
            </div>
            <div className="row" onClick={() => navigate(-1)}>
              <LinkButton className="btn btn-primary">Go Back</LinkButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
