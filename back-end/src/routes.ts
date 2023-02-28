import { UserController } from "./controller/UserController";
import { WishListItemController } from "./controller/WishListController";

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
    route: "/users/:id",
    controller: UserController,
    action: "one",
    //TODO: middleware: [auth]
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
  },
  {
    method: "delete",
    route: "/wish-list-items/:id",
    controller: WishListItemController,
    action: "remove",
  },
];
