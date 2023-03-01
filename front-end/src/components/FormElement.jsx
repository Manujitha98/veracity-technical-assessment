import React from "react";
import { Input } from "./Input";

export const FormElement = ({
  name,
  type,
  data,
  handleInputChange,
  placeholder = name,
}) => {
  return (
    <>
      <label htmlFor={name} className="fw-bold">
        {placeholder}
      </label>
      <Input
        name={name}
        type={type}
        data={data}
        handleInputChange={handleInputChange}
        placeholder={placeholder}
      />
    </>
  );
};
