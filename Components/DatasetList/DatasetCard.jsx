import { useState } from "react";
import { FiCalendar, FiMapPin, FiDownloadCloud } from "react-icons/fi";
import Image from "next/image";
import DescriptionModal from "../DescriptionModal";

export default function DatasetCard({ dataset, view }) {
  const [showModal, setShowModal] = useState(false);
  const isTruncated = dataset.description && dataset.description.length > 150;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatGeographies = (geographies) => {
    if (!geographies?.length) return "No data";
    const visible = geographies.slice(0, 2).join(", ");
    const extra = geographies.length > 2 ? ` +${geographies.length - 2}` : "";
    return visible + extra;
  };

  return (
    <>
      <div
        className={`bg-white border border-[#E3E8EE] rounded-xl p-5 shadow-sm hover:shadow-md transition-all ${
          view === "list" ? "flex flex-col gap-3" : "flex flex-col h-full"
        }`}
      >
        <h2 className="font-semibold text-[15px] text-[#1F5F8D] mb-2 leading-5 line-clamp-2">
          {dataset.title}
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <FiCalendar className="text-[#F59E0B]" />
            <span>{formatDate(dataset.created)}</span>
          </div>

          <div className="flex items-center gap-1">
            <FiDownloadCloud className="text-[#F59E0B]" />
            <span>{dataset.download_count}</span>
          </div>

          <div className="flex items-center gap-1 max-w- truncate">
            <FiMapPin className="text-[#F59E0B]" />
            <span className="truncate">{formatGeographies(dataset.geographies)}</span>
          </div>
        </div>

        <div className="relative">
          <p
            className={`text-sm text-gray-700 ${
              view === "grid" ? "line-clamp-3" : "line-clamp-2"
            }`}
          >
            {dataset.description}
          </p>
          {isTruncated && (
            <button
              onClick={() => setShowModal(true)}
              className="text-[#B17F3D] text-xs font-medium hover:underline mt-1 cursor-pointer"
            >
              See more
            </button>
          )}
        </div>

        {view === "list" && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-gray-600">Tags: </span>
            {(dataset.tags || []).slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="bg-[#41af88] text-black font-medium text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 mt-auto border-t text-xs text-gray-500">
          <span>Published by</span>

          <div className="w-10 h-10 bg-white rounded-full border flex items-center justify-center overflow-hidden">
            {dataset.organization?.logo ? (
              <Image
                src={dataset.organization.logo}
                alt="org"
                width={40}
                height={40}
                className="object-contain p-1"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full" />
            )}
          </div>
        </div>
      </div>

      <DescriptionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={dataset.title}
        description={dataset.description}
      />
    </>
  );
}
