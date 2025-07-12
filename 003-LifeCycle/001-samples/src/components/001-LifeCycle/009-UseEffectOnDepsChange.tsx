import React, { useState, useEffect } from 'react';

/**
 * Виконується при зміні залежності count (componentDidUpdate)
 */
function UseEffectOnDepsChange() {
    const [count, setCount] = useState(0);
    const [anotherValue, setAnotherValue] = useState(0);

    useEffect(() => {
        console.log('Значення count змінилося:', count);
    }, [count]);

    return (
        <div style={{ border: '2px solid orange', padding: 16, margin: 16 }}>
            <p>Виконання при зміні залежностей. Count {count}; AnotherVaue: {anotherValue}</p>

            <button onClick={() => setCount(count + 1)}>Change count</button>
            <button onClick={() => setAnotherValue(anotherValue + 1)}>Change another value</button>
        </div>
    );
}
export default UseEffectOnDepsChange;
