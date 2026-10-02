import { combineReducers } from 'redux';
import { counterReducer } from '../features/counter/counterReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
