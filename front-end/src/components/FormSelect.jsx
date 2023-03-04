import React from "react";

export const FormSelect = ({ data, setSelection, name, value }) => {
  return (
    <select
      className="form-select"
      onChange={(e) => setSelection(e)}
      name={name}
      value={value}
    >
      <option value="">Select</option>
      {data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
