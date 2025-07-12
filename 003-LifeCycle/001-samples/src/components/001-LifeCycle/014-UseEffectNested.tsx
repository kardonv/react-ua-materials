import React, { useEffect, useState } from 'react';

/**
 * Вкладені useEffect — не рекомендується, але можливо
 */
function UseEffectNested() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Зовнішній useEffect');

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            console.log('Внутрішній useEffect');
        }, [count]);
    }, []);

    return (
        <div style={{ border: '2px solid green', padding: 16, margin: 16 }}>
            <p>
                Вкладені useEffect (обережно)
            </p>

            <button onClick={() => setCount(count + 1)}>Збільшити</button>
        </div>
    );
}
export default UseEffectNested;
