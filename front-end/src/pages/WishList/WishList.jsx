import "./wishlist.css";
import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { movieService } from "../../services/movieService";
import { WishListContainer } from "../../components/WishListContainer";
import { toast } from "react-toastify";

export const WishList = () => {
  const [wishListItems, setWishListItems] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleRemoveButtonClicked = async () => {
    //optimistic update - remove the items from the UI first
    const copy = [...wishListItems];
    setWishListItems(
      wishListItems.filter((item) => !selected.includes(item.movie.id))
    );
    try {
      const response = await userService.removeFromWishList(selected);
      toast.success(response.message);
    } catch (ex) {
      setWishListItems(copy);
      toast.error(ex.response.data.error);
    }
    setSelected([]);
  };

  const initialize = async () => {
    const data = await userService.getMyProfile();
    //map the wishListItems array and find the movie by id
    const wishListItems = await Promise.all(
      data.wishListItems.map(async (item) => {
        const movie = await movieService.getMovie(item.movieId);
        return { ...item, movie };
      })
    );
    setWishListItems(wishListItems);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="container">
      <p className="display-5">WishList</p>
      <div className="d-flex flex-row-reverse bd-highlight">
        <div className="p-2 bd-highlight">
          <button
            className="form-control "
            onClick={handleRemoveButtonClicked}
            disabled={selected.length < 1}
          >
            Remove Selected
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        {wishListItems.length > 0 && (
          <WishListContainer
            wishListItems={wishListItems}
            selectHandler={handleSelect}
            selected={selected}
          />
        )}
        {
          //if wishListItems is empty, show a message
          wishListItems.length === 0 && (
            <div className="col-12">
              <p className="h4">Your wish list is empty</p>
            </div>
          )
        }
      </div>
    </div>
  );
};
