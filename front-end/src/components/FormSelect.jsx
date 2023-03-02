import React from "react";

export const FormSelect = ({ data, setSelection }) => {
  const handleChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <select className="form-select" onChange={(e) => handleChange(e)}>
      <option value="">Select</option>
      {data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
