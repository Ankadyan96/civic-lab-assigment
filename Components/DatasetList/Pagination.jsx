import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Pagination({
  page,
  pageSize,
  totalPages,
  loading,
  onPageChange,
  onPageSizeChange,
}) {
  const pageSizeOptions = [5, 10, 12, 20, 50];

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mt-10 px-4 py-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">
          Rows per page
        </span>
        <select
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((n) => (
            <option key={n} value={n}>
              {String(n).padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-700">
        <span className="text-center sm:text-left">
          Page {String(page).padStart(2, "0")} of {String(totalPages).padStart(2, "0")}
        </span>

        <div className="flex items-center justify-center gap-2 text-[#B17F3D]">
          <button
            onClick={() => onPageChange(1)}
            disabled={page === 1 || loading}
            className="disabled:opacity-30 p-1"
          >
            <MdKeyboardDoubleArrowLeft size={22} />
          </button>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1 || loading}
            className="disabled:opacity-30 p-1"
          >
            <GrFormPrevious size={22} />
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages || loading}
            className="disabled:opacity-30 p-1"
          >
            <GrFormNext size={22} />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages || loading}
            className="disabled:opacity-30 p-1"
          >
            <MdKeyboardDoubleArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
