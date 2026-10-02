import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { increment, decrement, reset } from '../store/actions/counterActions';
import styles from './Counter.module.css';

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className={styles.counterContainer}>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;