import React, { useEffect, useRef } from 'react';
/**
 * Взаємодія з DOM через useEffect
 */
function UseEffectDOM() {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
            console.log('Інпут отримав фокус');
        }
    }, []);

    return (
        <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
            <p>
                Взаємодія з DOM через useEffect
            </p>
            <input ref={ref} />
        </div>
    );
}
export default UseEffectDOM;
