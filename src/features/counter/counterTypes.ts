export const INCREMENT = 'counter/increment';
export const DECREMENT = 'counter/decrement';
export const RESET     = 'counter/reset';

export interface CounterState {
  value: number;
}

interface IncrementAction { type: typeof INCREMENT; }
interface DecrementAction { type: typeof DECREMENT; }
interface ResetAction     { type: typeof RESET; }

export type CounterActionTypes =
  | IncrementAction
  | DecrementAction
  | ResetAction;