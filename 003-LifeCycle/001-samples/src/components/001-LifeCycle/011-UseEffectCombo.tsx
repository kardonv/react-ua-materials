import React, { useState, useEffect } from 'react';

function UseEffectCombo() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const handler = () => {
            console.log('resize, current count:', count);
        };
        window.addEventListener('resize', handler);

        // Очищення підписки при зміні count або розмонтуванні
        return () => {
            window.removeEventListener('resize', handler);
            console.log('Cleanup of subscription for count:', count);
        };
    }, [count]);

    return (
        <div>
            <p>
                Реальний приклад — підписка на resize з очищенням
            </p>
            <button onClick={() => setCount(count + 1)}>Збільшити</button>
        </div>
    );
}

export default UseEffectCombo;
