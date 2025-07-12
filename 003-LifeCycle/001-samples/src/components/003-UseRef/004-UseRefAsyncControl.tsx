import React, { useRef, useEffect } from 'react';
/**
 * Контроль асинхронних операцій / таймерів
 */
function UseRefAsyncControl() {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            console.log('Timer tick');
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                console.log('Timer cleared');
            }
        };
    }, []);

    return (
        <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
            <p>
                Async timer control with useRef
            </p>
        </div>
    );
}
export default UseRefAsyncControl;
