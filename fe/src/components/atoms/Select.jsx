import React from "react";

const SelectOption = ({ name, value, onChange, options, id, className }) => {
  return (
    <div className={`relative ${className}`}>
      <select
        name={name}
        value={value}
        id={id}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
