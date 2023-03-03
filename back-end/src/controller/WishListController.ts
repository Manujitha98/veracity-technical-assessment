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
    //get the array of movie ids from the request body
    const { movieList } = request.body;
    const missingItems = [];

    //loop through the array of movie ids
    for (const movie of movieList) {
      //check if the user has the movie in his wish list
      let wishListItemToRemove = await this.wishListItemRepository.findOneBy({
        movieId: movie,
        user: request.user.id,
      });

      //if the movie does not exist in the wish list, return an error message
      if (!wishListItemToRemove) {
        missingItems.push(movie);
        continue;
      }

      //remove the movie from the wish list
      await this.wishListItemRepository.remove(wishListItemToRemove);
    }

    if (missingItems.length > 0) {
      response.status(400);
      return {
        error: "Some movies were not found in your wish list",
        missingItems,
      };
    } else return { message: "Movies removed from your wish list" };
  }
}
