import DatasetCard from "./DatasetCard";

export default function DatasetGrid({ datasets, view, loading, children }) {
  return (
    <div className="p-6">
      {loading && datasets.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      )}

      <div
        className={`gap-6 ${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "flex flex-col"
        }`}
      >
        {datasets.map((item) => (
          <DatasetCard key={item.id} dataset={item} view={view} />
        ))}
      </div>

      {children}
    </div>
  );
}
