export default function EmptyState({ filters, search }) {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <svg
        className="w-16 h-16 text-gray-300 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-gray-500 font-medium">No datasets found</p>
      <p className="text-sm text-gray-400 mt-2">
        {Object.values(filters || {}).some((arr) => arr?.length > 0) || search
          ? "No results match your current filters. Try adjusting them."
          : "Check your API connection."}
      </p>
    </div>
  );
}
