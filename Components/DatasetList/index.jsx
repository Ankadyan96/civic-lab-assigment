"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { fetchDatasetsRequest } from "../../Redux/actions/datasetActions";

import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import SearchHeader from "./SearchHeader";
import Pagination from "./Pagination";
import DatasetGrid from "./DatasetGrid";

export default function DatasetList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { datasets, loading, total, filters } = useSelector(
    (state) => state.dataset
  );

  const sortOptions = useMemo(
    () => [
      { label: "Recent", value: "recent" },
      { label: "Oldest", value: "oldest" },
      { label: "Popular", value: "popular" },
      { label: "Trending", value: "trending" },
    ],
    []
  );

  const getSortParams = useCallback((sortValue) => {
    switch (sortValue) {
      case "recent":
        return { sort: "recent", order: "desc" };
      case "oldest":
        return { sort: "oldest", order: "asc" };
      case "popular":
        return { sort: "popular", order: "desc" };
      case "trending":
        return { sort: "trending", order: "desc" };
      default:
        return { sort: "recent", order: "desc" };
    }
  }, []);

  const initializedRef = useRef(false);

  const [state, setState] = useState({
    view: "grid",
    search: "",
    page: 1,
    pageSize: 12,
    sortBy: "recent",
    isReady: false,
  });

  const { view, search, page, pageSize, sortBy } = state;
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const query = searchParams.get("query") || "";
    const pageNum = parseInt(searchParams.get("page")) || 1;
    const sizeNum = parseInt(searchParams.get("size")) || 12;
    const sortVal = searchParams.get("sort") || "recent";
    const validSort =
      sortOptions.find((o) => o.value === sortVal)?.value || "recent";

    setState({
      view: "grid",
      search: query,
      page: pageNum,
      pageSize: sizeNum,
      sortBy: validSort,
      isReady: true,
    });
  }, [searchParams, sortOptions]);

  useEffect(() => {
    if (!state.isReady) return;

    const sortParams = getSortParams(state.sortBy);
    dispatch(
      fetchDatasetsRequest({
        search: state.search,
        page: state.page,
        size: state.pageSize,
        ...sortParams,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isReady, state.search, state.page, state.pageSize, state.sortBy, dispatch]);

  const updateURL = useCallback(() => {
    if (!state.isReady) return;

    const params = new URLSearchParams();

    if (state.search) params.set("query", state.search);
    if (state.page > 1) params.set("page", state.page);
    if (state.pageSize !== 12) params.set("size", state.pageSize);
    if (state.sortBy !== "recent") params.set("sort", state.sortBy);

    if (filters.sectors?.length > 0)
      params.set("sectors", filters.sectors.join(","));
    if (filters.tags?.length > 0)
      params.set("tags", filters.tags.join(","));
    if (filters.formats?.length > 0)
      params.set("formats", filters.formats.join(","));
    if (filters.geographies?.length > 0)
      params.set("geographies", filters.geographies.join(","));

    const newURL = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.push(newURL, { scroll: false });
  }, [state, pathname, router, filters]);

  useEffect(() => {
    if (!state.isReady) return;

    const timer = setTimeout(() => {
      updateURL();
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, state.isReady]);

  useEffect(() => {
    if (!state.isReady) return;
    updateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, state.isReady]);

  useEffect(() => {
    if (!state.isReady) return;

    const urlSearch = searchParams.get("query") || "";
    if (urlSearch !== state.search) {
      updateState({ search: urlSearch });
    }
  }, [searchParams, state.isReady]);

  useEffect(() => {
    if (!state.isReady) return;
    updateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page, state.pageSize, state.sortBy, state.isReady]);

  useEffect(() => {
    if (state.isReady) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.page, state.isReady]);

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        updateState({ page: newPage });
      }
    },
    [totalPages, updateState]
  );

  const handlePageSizeChange = useCallback(
    (newSize) => {
      updateState({ pageSize: newSize, page: 1 });
    },
    [updateState]
  );

  const handleSortChange = useCallback(
    (newSort) => {
      updateState({ sortBy: newSort, page: 1 });
    },
    [updateState]
  );

  const handleSortIconClick = useCallback(() => {
    const currentIndex = sortOptions.findIndex(
      (opt) => opt.value === sortBy
    );
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    handleSortChange(sortOptions[nextIndex].value);
  }, [sortBy, sortOptions, handleSortChange]);

  if (!state.isReady || (loading && datasets.length === 0)) {
    return <LoadingSpinner />;
  }

  if (datasets.length === 0) {
    return <EmptyState filters={filters} search={search} />;
  }

  return (
    <div>
      <SearchHeader
        search={search}
        view={view}
        sortBy={sortBy}
        sortOptions={sortOptions}
        onSearchChange={(value) => updateState({ search: value })}
        onViewChange={(value) => updateState({ view: value })}
        onSortChange={handleSortChange}
        onSortIconClick={handleSortIconClick}
      />

      <DatasetGrid datasets={datasets} view={view} loading={loading}>
        {totalPages > 1 && (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
            loading={loading}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </DatasetGrid>
    </div>
  );
}
