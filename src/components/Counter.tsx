import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../features/counter/counterActions';
import type { RootState } from '../store/rootReducer';

export const Counter = () => {
  const value = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Count: {value}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};