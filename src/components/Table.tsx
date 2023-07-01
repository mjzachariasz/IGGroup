import { useEffect, useState } from "react";
import axios from "axios";

import { Skeleton, TableCell } from ".";
import { dropdownArrow, magnifyingGlass } from "../asets";
import Paginate from "./paginate";

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

interface FiltersInterface {
  profitLoss: "all" | "profit" | "loss";
  searchInput: string;
}

const Table = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState<FetchInterface[]>([]);
  const [filters, setFilters] = useState<FiltersInterface>({
    profitLoss: "all",
    searchInput: "",
  });

  const url = "https://recruitmentdb-508d.restdb.io/rest/accounts";
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

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

  useEffect(() => {
    setIsLoading(true);
    const config = {
      headers: {
        "x-api-key": import.meta.env.VITE_APIKEY,
      },
    };

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

  return (
    <div className="container mx-auto px-4 sm:px-8 h-[100vh]">
      <div className="py-8">
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
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
              <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
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
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <img
                src={magnifyingGlass}
                alt="searchbar's magnifying glass"
                className="h-4 w-4 fill-current text-gray-500"
              />
            </span>
            <input
              placeholder="Search"
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal table-fixed">
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
              <span className="text-xs xs:text-sm text-gray-900">
                {data.length > 0
                  ? `Showing ${indexOfFirstPost + 1} to ${
                      indexOfLastPost > data.length
                        ? data.length
                        : indexOfLastPost
                    } of ${data.length} entries`
                  : ""}
              </span>
              <div className="inline-flex justify-center items-center mt-2 xs:mt-0">
                <Paginate
                  postsPerPage={postsPerPage}
                  totalPosts={data.length}
                  currentPage={currentPage}
                  nextPage={nextPage}
                  paginate={paginate}
                  previousPage={previousPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
