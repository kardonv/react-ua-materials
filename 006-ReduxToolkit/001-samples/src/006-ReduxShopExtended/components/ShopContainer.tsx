import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCake } from '../redux/cake/cakeAction';
import { buyIceCream } from '../redux/iceCream/iceCreamAction';
import styles from '../styles.module.css';

// Define the root state interface based on the rootReducer structure
interface RootState {
  cake: {
    numOfCakes: number;
  };
  iceCream: {
    numOfIceCreams: number;
  };
}

export function ShopContainer(): React.JSX.Element {
  // Use RootState to access both cake and ice cream state
  const numOfCakes = useSelector((state: RootState) => state.cake.numOfCakes);
  const numOfIceCreams = useSelector((state: RootState) => state.iceCream.numOfIceCreams);
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

      <hr className={styles.divider} />

      <h2 className={styles.subtitle}>
        Number of Ice Creams: <span className={styles.cakeCount}>{numOfIceCreams}</span>
      </h2>

      <button
        className={styles.button}
        onClick={() => dispatch(buyIceCream())}
        disabled={numOfIceCreams === 0}
      >
        {numOfIceCreams === 0 ? 'Out of Stock' : 'Buy Ice Cream'}
      </button>

      {numOfIceCreams === 0 && (
        <p className={styles.outOfStock}>
          All ice creams have been sold! Please restock.
        </p>
      )}
    </div>
  );
}
