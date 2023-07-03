import { useEffect, useState } from "react";
import axios from "axios";

import { Skeleton, TableCell } from ".";
import { dropdownArrow, magnifyingGlass } from "../asets";
import Paginate from "./Paginate";

export interface FetchInterface {
  accountType: string;
  currency: string;
  default: boolean;
  funds: number;
  id: number;
  isDemo: boolean;
  name: string;
  profitLoss: number;
  _id: string;
}

interface FetchTypesInterface {
  _id: string;
  id: string;
  title: string;
}

type ProfitLossOptions = "All" | "Profit" | "Loss";

interface FiltersInterface {
  profitLoss: ProfitLossOptions;
  searchInput: string;
}

interface TypesInterface {
  [key: string]: string;
}

const Table = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState<FetchInterface[]>([]);
  const [types, setTypes] = useState<TypesInterface>({});
  const [filters, setFilters] = useState<FiltersInterface>({
    profitLoss: "All",
    searchInput: "",
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const [currentPosts, setCurrentPosts] = useState(
    data.slice(indexOfFirstPost, indexOfLastPost)
  );

  const compare = (a: FetchInterface, b: FetchInterface) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(data.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleTextFilter = (searchValue: string) => {
    setFilters({ ...filters, searchInput: searchValue });
  };

  const handleProfitLossFilter = (selectedValue: ProfitLossOptions) => {
    setFilters({ ...filters, profitLoss: selectedValue });
  };

  useEffect(() => {
    setIsLoading(true);
    const config = {
      headers: {
        "x-api-key": import.meta.env.VITE_APIKEY,
      },
    };
    const url = "https://recruitmentdb-508d.restdb.io/rest/accounts";

    const getUsers = async () => {
      try {
        const { data } = await axios.get(url, config);
        setData(data.sort(compare));
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          setIsLoading(false);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          setIsLoading(false);
          return "An unexpected error occurred";
        }
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        "x-api-key": import.meta.env.VITE_APIKEY,
      },
    };
    const url = "https://recruitmentdb-508d.restdb.io/rest/accounttypes";

    const getTypes = async () => {
      try {
        const { data } = await axios.get<FetchTypesInterface[]>(url, config);
        setTypes(
          data.reduce(
            (object, item) => Object.assign(object, { [item.id]: item.title }),
            {}
          )
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          setIsLoading(false);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          setIsLoading(false);
          return "An unexpected error occurred";
        }
      }
    };

    getTypes();
  }, []);

  useEffect(() => {
    setCurrentPosts(
      data
        .map((record) => {
          return { ...record, accountType: types[record.accountType] };
        })
        .filter((value) =>
          value.name
            .toLocaleLowerCase()
            .includes(filters.searchInput.toLocaleLowerCase())
        )
        .filter((value) => {
          if (filters.profitLoss === "Profit") return value.profitLoss > 0;
          if (filters.profitLoss === "Loss") return value.profitLoss < 0;
          return value;
        })
        .slice(indexOfFirstPost, indexOfLastPost)
    );
  }, [
    data,
    filters.profitLoss,
    filters.searchInput,
    indexOfFirstPost,
    indexOfLastPost,
    types,
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-8 min-h-[100vh]">
      <div className="py-8">
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                data-testid="dropdown-posts"
                className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={postsPerPage}
                onChange={(e) => setPostsPerPage(parseInt(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img
                  src={dropdownArrow}
                  alt="dropdown arrow"
                  className="fill-current h-4 w-4"
                />
              </div>
            </div>
            <div className="relative">
              <select
                data-testid="dropdown-profitLoss"
                onChange={(selectedValue) =>
                  handleProfitLossFilter(
                    selectedValue.target.value as ProfitLossOptions
                  )
                }
                className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option value="All">All</option>
                <option value="Profit">Profit</option>
                <option value="Loss">Loss</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img
                  src={dropdownArrow}
                  alt="dropdown arrow"
                  className="fill-current h-4 w-4"
                />
              </div>
            </div>
          </div>
          <div className="block relative w-full lg:w-[35%]">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <img
                src={magnifyingGlass}
                alt="searchbar's magnifying glass"
                className="h-4 w-4 fill-current text-gray-500"
              />
            </span>
            <input
              data-testid="input-searchbar"
              value={filters.searchInput}
              placeholder="Search using name"
              onChange={(event) => handleTextFilter(event.target.value)}
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table
              className="min-w-full leading-normal table-fixed"
              data-testid="main-table"
            >
              <thead>
                <tr>
                  <th
                    colSpan={6}
                    className="w-[45%] px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    colSpan={3}
                    className="w-[27.5%] px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Profit &amp; Loss
                  </th>
                  <th
                    colSpan={3}
                    className="w-[27.5%] px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Account Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(postsPerPage)].map((_, index) => (
                    <Skeleton key={index} />
                  ))
                ) : data.length > 0 ? (
                  currentPosts.map((singleRow) => (
                    <TableCell content={singleRow} key={singleRow._id} />
                  ))
                ) : (
                  <tr className="transition duration-300 ease-in-out bg-white hover:bg-neutral-100">
                    <td
                      colSpan={12}
                      className="px-5 py-5 border-b border-gray-200 text-sm"
                    >
                      <div className="flex items-center justify-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          No data found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <div className="inline-flex justify-center items-center mt-2 xs:mt-0">
                {isLoading ? (
                  <></>
                ) : data.length <= postsPerPage ? (
                  <></>
                ) : (
                  <Paginate
                    postsPerPage={postsPerPage}
                    totalPosts={data.length}
                    currentPage={currentPage}
                    nextPage={nextPage}
                    paginate={paginate}
                    previousPage={previousPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
