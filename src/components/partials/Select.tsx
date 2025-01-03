import React, { ChangeEvent } from "react";

interface Option {
  value: string; // The actual value of the option
  label?: string; // Optional label to display for the option
}

interface SelectProps {
  name: string;
  value: string;
  className?: string;
  options: Option[]; // Array of options for the dropdown
  onChange: (ev: ChangeEvent<HTMLSelectElement>) => void; // Correct type for select events
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  className = "",
  options,
  onChange,
  ...props
}) => {
  return (
    <select
      onChange={onChange}
      name={name}
      value={value}
      {...props}
      className={
        "bg-[#E8EEF2] rounded-md py-1 px-2 outline-none border-none text-[#546E96] text-sm placeholder:text-black/30 " +
        className
      }
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}{" "}
          {/* Use label if provided, fallback to value */}
        </option>
      ))}
    </select>
  );
};

export default Select;
