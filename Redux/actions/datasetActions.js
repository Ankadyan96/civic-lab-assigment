import {
  FETCH_DATASETS_REQUEST,
  FETCH_DATASETS_SUCCESS,
  FETCH_DATASETS_FAILURE,
  SET_FILTER,
  RESET_FILTERS,
} from "../constants/datasetConstants";

export const fetchDatasetsRequest = (params) => ({
  type: FETCH_DATASETS_REQUEST,
  payload: params,
});

export const fetchDatasetsSuccess = (data) => ({
  type: FETCH_DATASETS_SUCCESS,
  payload: data,
});

export const fetchDatasetsFailure = (error) => ({
  type: FETCH_DATASETS_FAILURE,
  payload: error,
});

export const setFilter = (filterType, value) => ({
  type: SET_FILTER,
  payload: { filterType, value },
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});