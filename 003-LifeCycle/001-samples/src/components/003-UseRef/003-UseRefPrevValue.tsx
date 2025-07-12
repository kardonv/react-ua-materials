import React, { useRef, useEffect, useState } from 'react';
/**
 * Зберігання попередніх значень
 */
function UseRefPrevValue() {
    const [count, setCount] = useState(0);
    const prevCount = useRef<number | null>(null);

    useEffect(() => {
        prevCount.current = count;
        console.log('Previous count:', prevCount.current);
    }, [count]);

    return (
        <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
            <p>Current: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
export default UseRefPrevValue;
