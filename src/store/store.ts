import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import logger from "redux-logger";

const loggerMiddleware = (logger as any).default ?? logger;

export const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;