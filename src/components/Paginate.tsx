interface PaginateProps {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  previousPage: () => void;
  nextPage: () => void;
}

const Paginate: React.FC<PaginateProps> = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
  previousPage,
  nextPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="inline-flex justify-center items-center">
      <li
        onClick={previousPage}
        className={`${currentPage === 1 ? "hidden" : ""}`}
      >
        <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
          Prev
        </button>
      </li>
      {pageNumbers.map((number) => (
        <li key={number} onClick={() => paginate(number)}>
          <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
            {number}
          </button>
        </li>
      ))}
      <li
        onClick={nextPage}
        className={`${
          currentPage === pageNumbers[pageNumbers.length - 1] ? "hidden" : ""
        } `}
      >
        <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
          Next
        </button>
      </li>
    </ul>
  );
};

export default Paginate;
