import { all } from "redux-saga/effects";
import { watchDatasetSaga } from "./saga/datasetSaga";

export default function* rootSaga() {
  yield all([watchDatasetSaga()]);
}
