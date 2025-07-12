import React, { useState } from 'react';

function SetStateInFunctionalComponent() {
    console.log('SetStateInFunctionalComponent function called');
    let [counter, setCounter] = useState<number>(0);

    const handleIncrement = () => {
        counter += 1;
        // setCounter(counter + 1)
        setCounter((prevValue) => prevValue)
        console.log('Incremented count:', counter);
    };

    const handleDecrement = () => {
        setCounter((prevValue) => prevValue - 1);
    };

    const incrementFiveTimes = () => {
        handleIncrement();
        handleIncrement();
        handleIncrement();
        handleIncrement();
        handleIncrement();
    }

    return (
        <div>
            <h2>State in functional Component</h2>
            <p>Count: {counter}</p>

            <button onClick={handleIncrement}>Increment</button>
            <button onClick={incrementFiveTimes}>Increment 5 Times</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    );
}

export default SetStateInFunctionalComponent;
