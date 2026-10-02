import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';
import logger from 'redux-logger';

const middlewares = import.meta.env.DEV
  ? applyMiddleware((logger as any).default ?? (logger as any))
  : undefined;

export const store = middlewares
  ? createStore(rootReducer, middlewares)
  : createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;