import React from "react";

export const Pagination = ({ page, handlePageChange, totalPages }) => {
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
          {page > 1 && (
            <a className="page-link" onClick={() => handlePageChange(page - 1)}>
              Previous
            </a>
          )}
        </li>
        {page < totalPages && (
          <li className="page-item">
            <a className="page-link" onClick={() => handlePageChange(page + 1)}>
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
