import React from "react";

export const FormInput = ({ onChangeHandler, type, name }) => {
  return (
    <input
      className="form-control"
      type={type}
      name={name}
      onChange={(e) => onChangeHandler(e)}
    />
  );
};
