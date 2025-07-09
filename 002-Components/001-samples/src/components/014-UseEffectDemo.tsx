import { useState } from 'react';

function UseEffectDemo() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>useEffect Demo</h2>
            <p>
                <b>Count (immediate):</b> {count}<br />
            </p>
            <button onClick={() => setCount(count + 1)}>
                Increment Count
            </button>
        </div>
    );
}

export default UseEffectDemo;
