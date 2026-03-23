import { FiSearch } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { BsViewList } from "react-icons/bs";
import { TbArrowsDownUp } from "react-icons/tb";

export default function SearchHeader({
  search,
  view,
  sortBy,
  sortOptions,
  onSearchChange,
  onViewChange,
  onSortChange,
  onSortIconClick,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4">
      <div className="relative w-full max-w-md">
        <FiSearch
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17F3D]"
          placeholder="Search datasets..."
        />
      </div>
      <div className="flex items-center gap-4 text-gray-700">
        <HiOutlineViewGrid
          size={24}
          className={`cursor-pointer ${view === "grid" ? "text-[#B17F3D]" : ""}`}
          onClick={() => onViewChange("grid")}
        />
        <BsViewList
          size={24}
          className={`cursor-pointer ${view === "list" ? "text-[#B17F3D]" : ""}`}
          onClick={() => onViewChange("list")}
        />
        <button
          onClick={onSortIconClick}
          className={`cursor-pointer p-1 rounded hover:bg-gray-100 ${
            sortBy !== "recent" ? "text-[#B17F3D]" : ""
          }`}
          title={`Sort by: ${sortOptions.find((o) => o.value === sortBy)?.label}`}
        >
          <TbArrowsDownUp size={24} />
        </button>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B17F3D]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
