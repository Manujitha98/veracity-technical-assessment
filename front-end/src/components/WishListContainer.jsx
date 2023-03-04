import React from "react";
//components
import { WishListRow } from "./WishListRow";

export const WishListContainer = ({
  wishListItems,
  selectHandler,
  selected,
}) => {
  return (
    <table className="table">
      <tbody>
        {wishListItems.map((item) => (
          <WishListRow
            item={item}
            key={item.id}
            selectHandler={selectHandler}
            selected={selected}
          />
        ))}
      </tbody>
    </table>
  );
};
