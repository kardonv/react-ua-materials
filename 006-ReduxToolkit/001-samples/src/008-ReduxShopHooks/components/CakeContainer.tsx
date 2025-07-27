import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/cake/cakeSlice';
import styles from '../styles.module.css';
import { RootState } from '../redux/store';


export function CakeContainer(): React.JSX.Element {
  const numOfCakes = useSelector((state: RootState) => state.cake.numOfCakes);
  const dispatch = useDispatch();

  return (
    <div className={styles.cakeContainer}>
      <h2 className={styles.subtitle}>
        Number of Cakes: <span className={styles.cakeCount}>{numOfCakes}</span>
      </h2>

      <button
        className={styles.button}
        onClick={() => dispatch(actions.buyCake())}
        disabled={numOfCakes === 0}
      >
        {numOfCakes === 0 ? 'Out of Stock' : 'Buy Cake'}
      </button>

      {numOfCakes === 0 && (
        <p className={styles.outOfStock}>
          All cakes have been sold! Please restock.
        </p>
      )}
    </div>
  );
}
