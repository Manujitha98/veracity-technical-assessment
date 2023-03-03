import React from "react";
import { Link } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <Link to={props.to}>
      <button className="btn btn-primary w-100" type={props.type}>
        {props.children}
      </button>
    </Link>
  );
};

export default LinkButton;
