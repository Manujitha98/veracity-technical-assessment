import React from "react";

export const Input = ({
  name,
  type,
  data,
  handleInputChange,
  placeholder = name,
}) => {
  return (
    <input
      value={data[name]}
      onChange={(e) => handleInputChange(e)}
      type={type}
      className="form-control"
      name={name}
      id={name}
      placeholder={placeholder}
    />
  );
};
