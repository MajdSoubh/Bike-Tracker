import React, { useState, ChangeEvent, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchInput from "../components/partials/SearchInput";
import Cases from "../components/Cases";
import { format } from "date-fns";
import { notifications } from "@mantine/notifications";
import Select from "../components/partials/Select";
import Pagination from "../components/partials/Pagination";

interface Query {
  text: string;
  perPage: number;
  currentPage: number;
}

interface CasesState {
  items: any[];
  loading: boolean;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState<Query>({
    text: "",
    perPage: 3,
    currentPage: 1,
  });
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [cases, setCases] = useState<CasesState>({ items: [], loading: true });
  const [casesCount, setCasesCount] = useState<{
    count: number;
    loading: boolean;
  }>({
    count: 0,
    loading: true,
  });
  const [filteredCases, setFilteredCases] = useState<any[]>([]);

  const handleQueryChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuery({ ...query, [event.target.name]: event.target.value });
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    if (dates[1]) setCalendarOpen(false);
  };

  const clearDateRange = (event: React.MouseEvent<HTMLSpanElement>) => {
    setDateRange([null, null]);
    event.stopPropagation();
  };

  const filterCasesByDate = () => {
    const { items } = cases;

    const filtered = items.filter((item) => {
      if (dateRange[0] === null) return true;
      if (item.date_stolen === null) return false;
      if (
        dateRange[0] &&
        item.date_stolen &&
        item.date_stolen.valueOf() < dateRange[0].valueOf()
      ) {
        return false;
      }
      if (
        dateRange[1] &&
        item.date_stolen &&
        item.date_stolen.valueOf() > dateRange[1].valueOf() + 86340000
      ) {
        return false;
      }
      return true;
    });

    setFilteredCases(filtered);
    setCasesCount({ count: filtered.length, loading: false });
  };

  const fetchCasesCount = async () => {
    setCasesCount({ count: 0, loading: true });
    const params = new URLSearchParams({
      query: query.text,
      per_page: query.perPage.toString(),
    }).toString();

    try {
      const response = await fetch(
        `https://bikeindex.org:443/api/v3/search/count?${params}`
      );
      const result = await response.json();
      setCasesCount({
        count: result.non + result.stolen + result.proximity,
        loading: false,
      });
    } catch {
      notifications.show({
        message: "Failed to fetch the case count. Please try again later.",
        position: "top-center",
        color: "red",
        autoClose: 2000,
      });
      setCasesCount({ count: 0, loading: false });
    }
  };

  const fetchCases = async () => {
    setCases({ items: [], loading: true });
    const params = new URLSearchParams({
      query: query.text,
      per_page: query.perPage.toString(),
      page: query.currentPage.toString(),
    }).toString();

    try {
      const response = await fetch(
        `https://bikeindex.org:443/api/v3/search?${params}`
      );
      const result = await response.json();
      const normalizedCases = result.bikes.map((item: any) => ({
        ...item,
        date_stolen:
          item.date_stolen?.toString().length === 10
            ? new Date(item.date_stolen * 1000)
            : new Date(item.date_stolen),
      }));
      setCases({ items: normalizedCases, loading: false });
      setFilteredCases(normalizedCases);
    } catch {
      notifications.show({
        message: "Failed to fetch the case data. Please try again later.",
        position: "top-center",
        color: "red",
        autoClose: 2000,
      });
      setCases({ items: [], loading: false });
    }
  };

  useEffect(() => {
    filterCasesByDate();
  }, [dateRange, cases.items]);

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchCases();
      fetchCasesCount();
    }, 500);
    return () => clearTimeout(delayFetch);
  }, [query]);

  return (
    <div className="pt-12 pb-8 px-4 md:px-8 md:w-[768px] lg:w-[960px] mx-auto">
      <h1 className="text-3xl uppercase">Search for all bikes</h1>

      {/* Search Panel */}
      <div className="mt-8">
        <SearchInput
          loading={cases.loading}
          name="text"
          className="w-full"
          placeholder="Search cases"
          value={query.text}
          onChange={handleQueryChange}
        />
        <div className="flex items-center justify-between mt-4 gap-4">
          <div className="relative">
            <button
              className={
                " min-h-[30px] flex items-center px-2 py-1 text-sm  bg-slate-500 text-white rounded-md hover:bg-slate-600 transition-all " +
                (isCalendarOpen || dateRange[0]
                  ? "bg-slate-600 ring-2 ring-slate-300"
                  : "")
              }
              onClick={() => setCalendarOpen(!isCalendarOpen)}
            >
              {dateRange[0] && (
                <span>{format(dateRange[0], "yyyy-MM-dd")}</span>
              )}
              {dateRange[1] && (
                <span>&nbsp;-&nbsp;{format(dateRange[1], "yyyy-MM-dd")}</span>
              )}
              {dateRange[0] && (
                <span className="ml-1" onClick={clearDateRange}>
                  &#x2715;
                </span>
              )}
              {!dateRange[0] && <span>Select Date Range</span>}
            </button>
            {isCalendarOpen && (
              <DatePicker
                selectsRange
                inline
                startDate={dateRange[0] || undefined}
                endDate={dateRange[1] || undefined}
                onChange={handleDateChange}
              />
            )}
          </div>
          <div>
            <Select
              value={query.perPage}
              name="perPage"
              label="Items per page"
              onChange={handleQueryChange}
              options={[
                { value: 3, label: "3" },
                { value: 10, label: "10" },
                { value: 20, label: "20" },
                { value: 30, label: "30" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Cases */}
      <div className="mt-8">
        <Cases data={filteredCases} loading={cases.loading} />
        {filteredCases.length > 0 && (
          <span className="text-xs ms-auto block w-fit mt-2 text-slate-600">
            Showing {query.perPage} from {casesCount.count} entries
          </span>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          totalItems={casesCount.count}
          itemsPerPage={query.perPage}
          currentpage={query.currentPage}
          onPageChange={(page) =>
            setQuery((prev) => ({ ...prev, currentPage: page }))
          }
          loading={casesCount.loading}
        />
      </div>
    </div>
  );
};

export default Home;
