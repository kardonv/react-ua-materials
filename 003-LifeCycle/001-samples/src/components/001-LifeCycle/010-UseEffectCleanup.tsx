import React, { useState, useEffect } from 'react';

/**
 * Очищення ресурсу (таймер) при розмонтуванні або зміні count
 */
function UseEffectCleanup() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log('Timer is running: ', timer);
        }, 1000);

        // Очищення таймера при розмонтуванні або зміні count
        return () => {
            clearInterval(timer);
            console.log('Timer cleaned!');
        };
    }, [count]);

    return (
        <div style={{ border: '2px solid pink', padding: 16, margin: 16 }}>
            <p>
                Очищення ефекту при розмонтуванні або зміні залежностей
            </p>

            <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
    );
}
export default UseEffectCleanup;
