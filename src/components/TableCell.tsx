import { FetchInterface } from "./Table";

interface TableCellProps {
  content: FetchInterface;
}

const TableCell = ({ content }: TableCellProps) => {
  return (
    <tr className="transition duration-300 ease-in-out bg-white hover:bg-neutral-100">
      <td colSpan={6} className="px-5 py-5 border-b border-gray-200 text-sm ">
        <div className="flex items-center">
          <p className="text-gray-900 whitespace-no-wrap">{content.name}</p>
        </div>
      </td>
      <td colSpan={3} className="px-5 py-5 border-b border-gray-200  text-sm">
        <span
          className={`${
            content.profitLoss > 0 ? "text-green-900 " : "text-red-900 "
          } relative inline-block px-4 py-1 font-semibold leading-tight`}
        >
          <span
            aria-hidden
            className={`${
              content.profitLoss > 0 ? "bg-green-200 " : "bg-red-200 "
            } absolute inset-0 opacity-50`}
          ></span>
          <span className="relative">
            {content.currency} {content.profitLoss}
          </span>
        </span>
      </td>
      <td colSpan={3} className="px-5 py-5 border-b border-gray-200  text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {content.accountType}
        </p>
      </td>
    </tr>
  );
};

export default TableCell;
