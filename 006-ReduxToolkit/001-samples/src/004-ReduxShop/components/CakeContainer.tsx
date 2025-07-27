import React from 'react';
import { connect } from 'react-redux';
import { buyCake } from '../redux/cake/cakeAction';
import { CakeState } from '../redux/cake/cakeTypes';
import styles from '../styles.module.css';
import { Dispatch } from 'redux';


interface CakeContainerProps {
  numOfCakes: number;
  buyCake: () => void;
}

const mapStateToProps = (state: CakeState, props: any) => {
  return {
    numOfCakes: state.numOfCakes,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
  return {
    buyCake: () => dispatch(buyCake()),
  };
};

function CakeContainer({ numOfCakes, buyCake }: CakeContainerProps): React.JSX.Element {
  return (
    <div className={styles.cakeContainer}>
      <h2 className={styles.subtitle}>
        Number of Cakes: <span className={styles.cakeCount}>{numOfCakes}</span>
      </h2>

      <button
        className={styles.button}
        onClick={buyCake}
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

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer);