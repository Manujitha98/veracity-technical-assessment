import React from "react";
import { WishListRow } from "./WishListRow";

export const WishListContainer = ({ wishListItems }) => {
  return (
    <table className="table">
      <tbody>
        {wishListItems.map((item) => (
          <WishListRow item={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};
