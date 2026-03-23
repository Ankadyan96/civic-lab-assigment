import { STATIC_BASE_URL } from "../api/axiosInstance";

const AGGREGATION_FIELDS = ["sectors", "tags", "formats", "geographies"];

export const transformAggregations = (aggregations) => {
  if (!aggregations) return {};

  const transformed = {};
  for (const [key, value] of Object.entries(aggregations)) {
    if (AGGREGATION_FIELDS.includes(key) && value?.buckets) {
      transformed[key] = value.buckets.reduce((acc, bucket) => {
        acc[bucket.key] = bucket.doc_count;
        return acc;
      }, {});
    } else if (key === "dataset_type" && value?.buckets) {
      transformed.formats = value.buckets.reduce((acc, bucket) => {
        acc[bucket.key] = bucket.doc_count;
        return acc;
      }, {});
    } else {
      transformed[key] = value;
    }
  }
  return transformed;
};

export const transformDatasets = (datasets) => {
  return datasets.map((dataset) => ({
    ...dataset,
    organization: dataset.organization
      ? {
          ...dataset.organization,
          logo: dataset.organization.logo
            ? `${STATIC_BASE_URL}${dataset.organization.logo}`
            : null,
        }
      : null,
  }));
};
