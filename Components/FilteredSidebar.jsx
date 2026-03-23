"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, resetFilters } from "../Redux/actions/datasetActions";
import { fetchDatasetsRequest } from "../Redux/actions/datasetActions";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { HiX } from "react-icons/hi";

export default function FilterSidebar({ onClose }) {
  const dispatch = useDispatch();
  const { aggregations, filters } = useSelector((state) => state.dataset);

  const [expandedSections, setExpandedSections] = useState({
    sectors: true,
    formats: true,
    tags: true,
    geographies: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (type, value) => {
    const currentValues = filters[type];
    const exists = currentValues.includes(value);

    const newValues = exists
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    dispatch(setFilter(type, value));
    dispatch(fetchDatasetsRequest({ [type]: newValues }));
  };

  const renderCheckboxList = (data, type) => {
    return Object.entries(data || {}).map(([key, count]) => (
      <label
        key={key}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#1F5F8D] cursor-pointer"
      >
        <input
          type="checkbox"
          checked={filters[type].includes(key)}
          onChange={() => handleChange(type, key)}
          className="accent-[#B17F3D] w-4 h-4 border border-[#D5E1EA] rounded-sm"
        />
        <span className="flex-1 capitalize">{key}</span>
        <span className="text-gray-400 text-xs">({count})</span>
      </label>
    ));
  };

  return (
    <aside className="w-80 md:w-72 bg-white shadow-lg border border-gray-200 rounded-xl p-4 md:p-5 h-full md:sticky md:top-20 max-h-screen md:max-h-[90vh] overflow-y-auto custom-scroll">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-[#1F5F8D]">Filters</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              dispatch(resetFilters());
              dispatch(fetchDatasetsRequest({}));
            }}
            className="text-sm text-[#B17F3D] hover:underline font-medium cursor-pointer"
          >
            Reset
          </button>
          
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-gray-100 rounded"
          >
            <HiX size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

     
      <Section
        title="Sectors"
        isExpanded={expandedSections.sectors}
        onToggle={() => toggleSection("sectors")}
        count={filters.sectors.length}
      >
        {renderCheckboxList(aggregations.sectors, "sectors")}
      </Section>

      <Section
        title="Data Type"
        isExpanded={expandedSections.formats}
        onToggle={() => toggleSection("formats")}
        count={filters.formats.length}
      >
        {renderCheckboxList(aggregations.formats, "formats")}
      </Section>

      <Section
        title="Tags"
        isExpanded={expandedSections.tags}
        onToggle={() => toggleSection("tags")}
        count={filters.tags.length}
      >
        {renderCheckboxList(aggregations.tags, "tags")}
      </Section>

      <Section
        title="Geographies"
        isExpanded={expandedSections.geographies}
        onToggle={() => toggleSection("geographies")}
        count={filters.geographies.length}
      >
        {renderCheckboxList(aggregations.geographies, "geographies")}
      </Section>
    </aside>
  );
}

function Section({ title, children, isExpanded, onToggle, count }) {
  return (
    <div className="mb-6">
      
      <div
        onClick={onToggle}
        className="flex items-center justify-between bg-[#E9EFF4] text-[#1F5F8D] font-semibold text-sm px-4 py-2 rounded-lg cursor-pointer border border-[#D5E1EA]"
      >
        <div className="flex items-center gap-2">
          <span>{title.toUpperCase()}</span>

          {count > 0 && (
            <span className="bg-[#1F5F8D] text-white text-xs px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>

        <ChevronDownIcon
          className={`w-4 h-4 text-[#194C71] transition-transform duration-200 ${
            isExpanded ? "" : "rotate-180"
          }`}
        />
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-2 px-3 max-h-56 overflow-y-auto pr-1 custom-scroll">
          {children}
        </div>
      )}
    </div>
  );
}
