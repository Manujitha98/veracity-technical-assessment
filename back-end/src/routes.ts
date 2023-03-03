import { AuthController } from "./controller/AuthController";
import { MoviesController } from "./controller/MoviesController";
import { UserController } from "./controller/UserController";
import { WishListItemController } from "./controller/WishListController";
import { auth } from "./middleware/auth";

export const Routes = [
  //Routes for the users
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/me",
    controller: UserController,
    action: "myProfile",
    middleware: [auth],
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },

  //Routes for the wish list items
  {
    method: "post",
    route: "/wish-list-items",
    controller: WishListItemController,
    action: "add",
    middleware: [auth],
  },
  {
    method: "delete",
    route: "/wish-list-items",
    controller: WishListItemController,
    action: "remove",
    middleware: [auth],
  },

  //Routes for the authentication
  {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
  },

  //Routes for the movies
  {
    method: "get",
    route: "/movies",
    controller: MoviesController,
    action: "getAllMovies",
  },
  {
    method: "get",
    route: "/movies/search",
    controller: MoviesController,
    action: "searchMovie",
  },
  {
    method: "get",
    route: "/movies/:id",
    controller: MoviesController,
    action: "getMovieById",
  },
];
