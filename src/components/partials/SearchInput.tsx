import React, { ChangeEvent } from "react";

interface SearchInputProps {
  name: string;
  value: string;
  placeholder?: string;
  className?: string;
  error?: string;
  label?: string;
  onChange: (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  name,
  value,
  placeholder,
  className = "",
  error,
  onChange,
  ...props
}) => {
  return (
    <div
      className={
        "bg-[#E8EEF2] px-4 py-3 rounded-2xl flex justify-center gap-3 items-center " +
        className
      }
    >
      <svg
        viewBox="0 0 32 32"
        width="25px"
        height="25px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>search</title> <desc>Created with Sketch Beta.</desc>
          <defs> </defs>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Icon-Set"
              transform="translate(-256.000000, -1139.000000)"
              fill="#4F7197"
            >
              <path
                d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                id="search"
              ></path>
            </g>
          </g>
        </g>
      </svg>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        className={`w-full bg-transparent outline-none border-none text-[#546E96] text-sm placeholder:text-black/30  `}
        aria-invalid={!!error}
        onChange={onChange}
        {...props}
      />
      {error && <span className="text-xs text-orange font-bold">{error}</span>}
    </div>
  );
};

export default SearchInput;
