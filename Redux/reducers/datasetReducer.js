import {
  FETCH_DATASETS_REQUEST,
  FETCH_DATASETS_SUCCESS,
  FETCH_DATASETS_FAILURE,
  SET_FILTER,
  RESET_FILTERS,
} from "../constants/datasetConstants";

const initialState = {
  loading: false,
  datasets: [],
  total: 0,
  aggregations: {},

  filters: {
    sectors: [],
    tags: [],
    formats: [],
    geographies: [],
    licenses: [],
  },

  error: null,
};

export const datasetReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATASETS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATASETS_SUCCESS:
      return {
        ...state,
        loading: false,
        datasets: action.payload.results,
        total: action.payload.total,
        aggregations: action.payload.aggregations ?? state.aggregations,
      };
    case FETCH_DATASETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_FILTER:
      const { filterType, value } = action.payload;
      const currentValues = state.filters[filterType];
      const exists = currentValues.includes(value);
      return {
        ...state,
        filters: {
          ...state.filters,
          [filterType]: exists
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value],
        },
      };
    case RESET_FILTERS:
      return {
        ...state,
        filters: {
          sectors: [],
          tags: [],
          formats: [],
          geographies: [],
          licenses: [],
        },
      };
    default:
      return state;
  }
};

