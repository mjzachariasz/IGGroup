import { FetchInterface } from "./Table";

interface TableCellProps {
  content: FetchInterface;
}

const TableCell = ({ content }: TableCellProps) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          {/* <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
              alt=""
            />
          </div> */}
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{content.name}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`${
            content.profitLoss > 0 ? "text-green-900 " : "text-red-900 "
          } relative inline-block px-3 py-1 font-semibold leading-tight`}
        >
          <span
            aria-hidden
            className={`${
              content.profitLoss > 0 ? "bg-green-200 " : "bg-red-200 "
            } absolute inset-0 opacity-50 rounded-full`}
          ></span>
          <span className="relative">
            {content.currency} {content.profitLoss}
          </span>
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {content.accountType}
        </p>
      </td>
    </tr>
  );
};

export default TableCell;
