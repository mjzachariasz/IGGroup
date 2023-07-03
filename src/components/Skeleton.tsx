const Skeleton = () => {
  return (
    <tr className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded animate-pulse bg-white">
      <td colSpan={6} className="px-5 py-5 border-b border-gray-200 text-sm">
        <div className="flex items-center">
          <div className="px-5 h-3 bg-gray-200 rounded-full w-72"></div>
        </div>
      </td>
      <td colSpan={3} className="px-5 py-5 border-b border-gray-200  text-sm">
        <span
          className={` relative inline-block py-1 font-semibold leading-tight`}
        >
          <span aria-hidden className={` absolute inset-0 opacity-50`}></span>
          <span className="relative">
            <div className="h-3 bg-gray-200 rounded-full w-36"></div>
          </span>
        </span>
      </td>
      <td colSpan={3} className="px-5 py-5 border-b border-gray-200  text-sm">
        <div className="flex items-center">
          <div className="px-5 h-3 bg-gray-200 rounded-full w-28"></div>
        </div>
      </td>
    </tr>
  );
};

export default Skeleton;
