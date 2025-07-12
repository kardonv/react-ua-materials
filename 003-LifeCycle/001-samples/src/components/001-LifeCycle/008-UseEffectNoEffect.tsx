import React, { useState } from 'react';

/**
 * Функція викликається на кожен рендер, навіть якщо дані не змінилися
 */
function UseEffectNoEffect() {
    const [count, setCount] = useState(0);

    // Це не useEffect, тому викликається на кожен рендер
    console.log('Component Render! Count = ', count);

    return (
        <div style={{ border: '2px solid orange', padding: 16, margin: 16 }}>
            <p>
                Без useEffect — функція викликається на кожен рендер
            </p>
            <button onClick={() => setCount(count + 1)}>Збільшити</button>
        </div>
    );
}
export default UseEffectNoEffect;
