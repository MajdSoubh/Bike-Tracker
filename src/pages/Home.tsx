import React, { useState, ChangeEvent, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchInput from "../components/partials/SearchInput";
interface SearchQuery {
  text: string;
  date: Array<Date | null>;
}

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    text: "",
    date: [null, null],
  });

  const [isCalendarOpen, setCalendarOpen] = useState(true);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSearchQuery({ ...searchQuery, [ev.target.name]: ev.target.value });
  };

  const handleDateChange = (date: Array<Date | null>) => {
    setSearchQuery({ ...searchQuery, date });
    if (date[1] !== null) setCalendarOpen(false);
  };
  const handleClearDate = () => {
    setSearchQuery({ ...searchQuery, date: [null, null] });
  };
  return (
    <div className="pt-12 pb-8 w-max px-8 mx-auto">
      <h1 className="text-3xl uppercase">Search for all bikes</h1>
      {/* Search Panel */}
      <div className="mt-8 ">
        <SearchInput
          name="text"
          className="max-md:w-full w-[800px]"
          placeholder="Search cases"
          value={searchQuery.text}
          onChange={handleChange}
        />

        <div className="relative">
          <button
            className="bg-[#E8EEF2] relative flex items-center justify-center text-black-100 font-medium text-xs p-2 mt-4 rounded-lg"
            onClick={() => {
              setCalendarOpen(!isCalendarOpen);
            }}
          >
            {searchQuery.date[0] && (
              <span>{formatDate(searchQuery.date[0])}</span>
            )}
            {searchQuery.date[1] && (
              <span>&nbsp;- &nbsp;{formatDate(searchQuery.date[1])}</span>
            )}
            {searchQuery.date[0] && (
              <span className="ml-1" onClick={handleClearDate}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  width="20px"
                  className="hover:bg-black group rounded-full inline-block transition-all"
                  height="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="Menu / Close_SM">
                      <path
                        id="Vector"
                        className="group-hover:stroke-white transition-all"
                        d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </g>
                </svg>
              </span>
            )}
            {!searchQuery.date[0] && <span>Select Date Range</span>}
          </button>
          {isCalendarOpen && (
            <DatePicker
              selectsRange={true}
              onBlur={() => setCalendarOpen(false)}
              name="date"
              dateFormat="yyyy/MM/dd"
              startDate={searchQuery.date[0]}
              endDate={searchQuery.date[1]}
              onChange={handleDateChange}
              isClearable
              inline
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
