import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { WishListItem } from "../entity/WishListItem";

export class WishListItemController {
  private wishListItemRepository = AppDataSource.getRepository(WishListItem);

  async add(request: Request, response: Response, next: NextFunction) {
    const { movieId } = request.body;

    //check if the movie exists in the users wish list
    const wishListItemFound = await this.wishListItemRepository.findOneBy({
      movieId: parseInt(movieId),
      user: request.user.id,
    });
    //if the movie exists in the wish list, return an error message
    if (wishListItemFound) {
      response.status(400);
      return "this movie already exists in your wish list";
    }
    //create a new wish list item
    const wishListItem = Object.assign(new WishListItem(), {
      movieId: parseInt(movieId),
      user: request.user.id,
    });

    return this.wishListItemRepository.save(wishListItem);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    //The id of the movie to be removed is taken from url param
    const id = parseInt(request.params.id);

    //check if the user has the movie in his wish list
    let wishListItemToRemove = await this.wishListItemRepository.findOneBy({
      movieId: id,
      user: request.user.id,
    });

    //if the movie does not exist in the wish list, return an error message
    if (!wishListItemToRemove) {
      response.status(404);
      return "this wish list entry does not exist";
    }

    //remove the movie from the wish list
    await this.wishListItemRepository.remove(wishListItemToRemove);
    return "wish list item removed";
  }
}
