import React from "react";

export const FormSelect = ({ data, setSelection, name }) => {
  return (
    <select
      className="form-select"
      onChange={(e) => setSelection(e)}
      name={name}
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
