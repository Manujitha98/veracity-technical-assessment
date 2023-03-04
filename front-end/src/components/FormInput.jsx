import React from "react";

export const FormInput = ({ onChangeHandler, type, name, min, max, value }) => {
  return (
    <input
      className="form-control"
      type={type}
      name={name}
      onChange={(e) => onChangeHandler(e)}
      placeholder={name}
      min={min}
      max={max}
      value={value}
    />
  );
};
