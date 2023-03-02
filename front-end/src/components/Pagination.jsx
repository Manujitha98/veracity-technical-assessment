import React from "react";

export const Pagination = ({ page, handlePageChange }) => {
  //disable the previous button if the page is 1
  const disabled = () => {
    if (page === 1) {
      return " page-item disabled";
    }
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={disabled()}>
          <a
            className="page-link"
            href="/#"
            tabIndex="-1"
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </a>
        </li>
        {page > 1 && (
          <li className="">
            <a
              className="page-link"
              href="/#"
              onClick={() => handlePageChange(page - 1)}
            >
              {page - 1}
            </a>
          </li>
        )}
        <li className="page-item">
          <a
            className="page-link"
            href="/#"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
        <li className="page-item">
          <a
            className="page-link"
            href="/#"
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="/#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
