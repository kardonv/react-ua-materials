import { useEffect, useState } from 'react';

function UseEffectDemo() {
    const [count, setCount] = useState(0);
    const [effectCount, setEffectCount] = useState(0);

    useEffect(() => {
        console.log('Use effect function called with count:', effectCount);
    }, [effectCount]); // Dependency array, effect runs when count changes

    useEffect(() => {
        console.log('Use effect function called without dependencies');
    });

    return (
        <div>
            <h2>useEffect Demo</h2>
            <p>
                <b>Count (immediate):</b> {count}<br />
                <b>Effect count:</b> {effectCount}<br />
            </p>
            <button onClick={() => setCount(count + 1)}>
                Increment Count
            </button>
            <button onClick={() => setEffectCount(effectCount + 1)}>
                Increment Effect Count
            </button>
        </div>
    );
}

export default UseEffectDemo;
