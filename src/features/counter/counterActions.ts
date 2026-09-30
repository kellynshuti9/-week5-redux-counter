import { INCREMENT, DECREMENT, RESET } from './counterTypes';
import type { CounterState, CounterActionTypes } from './counterTypes';

const initialState: CounterState = { value: 0 };

export const counterReducer = (
  state = initialState,
  action: CounterActionTypes
): CounterState => {
  switch (action.type) {
    case INCREMENT: return { ...state, value: state.value + 1 };
    case DECREMENT: return { ...state, value: state.value - 1 };
    case RESET:     return { ...state, value: 0 };
    default:        return state;
  }
};