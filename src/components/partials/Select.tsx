import React, { ChangeEvent } from "react";

interface Option {
  value: number;
  label?: string;
}

interface SelectProps {
  name: string;
  value: number;
  className?: string;
  options: Option[];
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
        "bg-[#E8EEF2] rounded-md py-1 px-2 outline-none border-none text-[#546E96] text-sm placeholder:text-black/30 transition-all focus:ring-1 focus:shadow ring-slate-300 " +
        className
      }
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </select>
  );
};

export default Select;
