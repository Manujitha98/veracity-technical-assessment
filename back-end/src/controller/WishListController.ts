import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { WishListItem } from "../entity/WishListItem";

export class WishListItemController {
  private wishListItemRepository = AppDataSource.getRepository(WishListItem);

  async add(request: Request, response: Response, next: NextFunction) {
    const { movieId } = request.body;

    //TODO: check if the movie exists in the users wish list
    const wishListItem = Object.assign(new WishListItem(), {
      movieId: parseInt(movieId),
      user: request.user.id,
    });

    return this.wishListItemRepository.save(wishListItem);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let wishListItemToRemove = await this.wishListItemRepository.findOneBy({
      id,
    });

    if (!wishListItemToRemove) {
      return "this wish list entry does not exist";
    }

    await this.wishListItemRepository.remove(wishListItemToRemove);

    return "wish list item removed";
  }
}
