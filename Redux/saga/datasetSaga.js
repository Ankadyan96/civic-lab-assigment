import { call, put, takeLatest, select } from "redux-saga/effects";

import { FETCH_DATASETS_REQUEST } from "../constants/datasetConstants";
import {
  fetchDatasetsSuccess,
  fetchDatasetsFailure,
} from "../actions/datasetActions";

import { getDatasets } from "../api/datasetApi";
import { transformDatasets, transformAggregations } from "../utils/dataTransforms";

const getFilters = (state) => state.dataset.filters;

function* fetchDatasetsSaga(action) {
  try {
    const reduxFilters = yield select(getFilters);
    const payloadFilters = action.payload || {};
    
    const toCommaString = (value) => {
      if (Array.isArray(value)) {
        return value.length > 0 ? value.join(",") : undefined;
      }
      return value;
    };
    
    const params = {
      sectors: toCommaString(payloadFilters.sectors !== undefined ? payloadFilters.sectors : reduxFilters.sectors),
      tags: toCommaString(payloadFilters.tags !== undefined ? payloadFilters.tags : reduxFilters.tags),
      formats: toCommaString(payloadFilters.formats !== undefined ? payloadFilters.formats : reduxFilters.formats),
      geographies: toCommaString(payloadFilters.geographies !== undefined ? payloadFilters.geographies : reduxFilters.geographies),
      time_period: toCommaString(payloadFilters.timePeriod !== undefined ? payloadFilters.timePeriod : reduxFilters.timePeriod),
      licenses: toCommaString(reduxFilters.licenses),
      
      ...Object.fromEntries(
        Object.entries(payloadFilters).filter(([key]) => 
          !['sectors', 'tags', 'formats', 'geographies', 'licenses'].includes(key)
        )
      ),
    };

    // Map search to query for API
    if (params.search) {
      params.query = params.search;
      delete params.search;
    }

    Object.keys(params).forEach((key) => {
      if (
        params[key] === undefined ||
        params[key] === null ||
        params[key] === ""
      ) {
        delete params[key];
      }
    });

    const data = yield call(getDatasets, params);
    
    const newAggregations = transformAggregations(data.aggregations);
    const hasData = Object.values(newAggregations).some(
      (agg) => agg && typeof agg === "object" && Object.keys(agg).length > 0
    );

    const transformedData = {
      ...data,
      results: transformDatasets(data.results),
      aggregations: hasData ? newAggregations : undefined,
    };
    
    yield put(fetchDatasetsSuccess(transformedData));
  } catch (error) {
    yield put(fetchDatasetsFailure(error));
  }
}

export function* watchDatasetSaga() {
  yield takeLatest(FETCH_DATASETS_REQUEST, fetchDatasetsSaga);
}
