import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { datasetReducer } from "./reducers/datasetReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    dataset: datasetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});


sagaMiddleware.run(rootSaga);
