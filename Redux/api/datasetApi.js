import axiosInstance from "./axiosInstance";

export const getDatasets = (params = {}) => {
  return axiosInstance.get("search/dataset/", {
    params,
  });
};
