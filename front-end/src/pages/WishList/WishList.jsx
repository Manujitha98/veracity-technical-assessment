import "./wishlist.css";
import unchecked from "../../assets/images/unchecked.png";
import checked from "../../assets/images/checked.png";

export const WishList = () => {
  return (
    <div className="container">
      <h1 className="h1">WishList</h1>
      <div class="d-flex flex-row-reverse bd-highlight">
        <div class="p-2 bd-highlight">
          <button className="form-control ">Remove Selected</button>
        </div>
        <div class="p-2 bd-highlight">
          <button className="form-control ">Select</button>
        </div>
      </div>
      <hr />
      <div className="row">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <img src={unchecked} alt="" className="chkd-unchkd" />
              </td>
              <td>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg"
                  alt="product"
                  className="movieThumbnail"
                />
              </td>
              <td>
                <p className="h4">Movie Name</p>
              </td>
              <td>option</td>
            </tr>
            <tr>
              <td>
                <img src={checked} alt="" className="chkd-unchkd" />
              </td>
              <td>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg"
                  alt="product"
                  className="movieThumbnail"
                />
              </td>
              <td>
                <p className="h4">Movie Name</p>
              </td>
              <td>option</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
