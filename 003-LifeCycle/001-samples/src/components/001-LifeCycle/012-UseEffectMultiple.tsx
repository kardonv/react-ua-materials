import React, { useState, useEffect } from 'react';
/**
 * Кожен useEffect відповідає за свою частину логіки
 */
function UseEffectMultiple() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    useEffect(() => {
        console.log('count changed:', count);
    }, [count]);

    useEffect(() => {
        console.log('text changed:', text);
    }, [text]);

    return (
        <div style={{ border: '2px solid orange', padding: 16, margin: 16 }}>
            <p>
                Використання кількох useEffect для поділу логіки
            </p>

            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={() => setCount(count + 1)}>Збільшити</button>
        </div>
    );
}
export default UseEffectMultiple;
