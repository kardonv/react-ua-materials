import React, { useEffect } from 'react';
/**
 * Очищення при розмонтуванні (аналог componentWillUnmount)
 */
function UseEffectWillUnmount() {
    useEffect(() => {
        return () => {
            console.log('Component is going to be unmount');
        };
    }, []);

    return (
        <div style={{ border: '2px solid orange', padding: 16, margin: 16 }}>
            <p>
                Імітація componentWillUnmount
            </p>
        </div>
    );
}
export default UseEffectWillUnmount;
