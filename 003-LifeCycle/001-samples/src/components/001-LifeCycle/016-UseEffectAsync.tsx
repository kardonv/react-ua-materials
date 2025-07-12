import React, { useEffect, useState } from 'react';
/**
 * Асинхронний запит через useEffect
 */
function UseEffectAsync() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const result = await new Promise<string>(resolve =>
                setTimeout(() => resolve('Data revceived!'), 2000)
            );
            setData(result);
        }

        fetchData();
    }, []);

    return (
        <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
            <p>
                Використання з асинхронними функціями — {data ?? 'Loading...'}
            </p>
        </div>
    );
}
export default UseEffectAsync;
