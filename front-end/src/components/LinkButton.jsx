import React from "react";
import { Link } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <Link to={props.to}>
      <button className="btn btn-primary" type={props.type}>
        {props.children}
      </button>
    </Link>
  );
};

export default LinkButton;
