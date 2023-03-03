import "./wishlist.css";
import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { movieService } from "../../services/movieService";
import { WishListContainer } from "../../components/WishListContainer";

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

  const initialize = async () => {
    const data = await userService.getMyProfile();
    //map the wishListItems array and find the movie by id
    const wishListItems = await Promise.all(
      data.wishListItems.map(async (item) => {
        const movie = await movieService.getMovie(item.movieId);
        return { ...item, movie };
      })
    );
    console.log(wishListItems);
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
          <button className="form-control ">Remove Selected</button>
        </div>
      </div>
      <hr />
      <div className="row">
        <WishListContainer wishListItems={wishListItems} />
      </div>
    </div>
  );
};
