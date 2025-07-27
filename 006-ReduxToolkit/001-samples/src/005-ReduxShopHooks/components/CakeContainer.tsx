import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCake } from '../redux/cake/cakeAction';
import { CakeState } from '../redux/cake/cakeTypes';
import styles from '../styles.module.css';

interface CakeContainerProps {
  numOfCakes: number;
  buyCake: () => void;
}

export function CakeContainer(): React.JSX.Element {
  const numOfCakes = useSelector((state: CakeState) => state.numOfCakes);
  const dispatch = useDispatch();

  return (
    <div className={styles.cakeContainer}>
      <h2 className={styles.subtitle}>
        Number of Cakes: <span className={styles.cakeCount}>{numOfCakes}</span>
      </h2>

      <button
        className={styles.button}
        onClick={() => dispatch(buyCake())}
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
