"use client";

import { useState, Suspense } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FiFilter } from "react-icons/fi";
import FilterSidebar from "../Components/FilteredSidebar";
import DatasetList from "../Components/DatasetList";
import { fetchDatasetsRequest } from "../Redux/actions/datasetActions";
import Header from "../Components/Header";

function DatasetListFallback() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDatasetsRequest());
  }, [dispatch]);

  return (
    <div className="font-poppins">
      <Header />
      <div className="flex min-h-screen bg-white relative">
        {/* Sidebar Toggle Button - Mobile Only */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-20 left-4 z-40 bg-[#1F5F8D] text-white p-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <FiFilter size={20} />
          <span className="text-sm font-medium">Filters</span>
        </button>

        {/* Sidebar */}
        <div
          className={`
            fixed md:relative inset-y-0 left-0 z-50
            transform transition-transform duration-300 ease-in-out
            md:transform-none
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <FilterSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Overlay Backdrop - Mobile Only */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          <Suspense fallback={<DatasetListFallback />}>
            <DatasetList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
