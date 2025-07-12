import React, { useRef } from 'react';
/**
 * Доступ до DOM-елементів через useRef
 */
function UseRefDOM() {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            console.log('Input focused');
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
            <input ref={inputRef} type='text' />
            <button onClick={handleFocus}>Focus input</button>
        </div>
    );
}
export default UseRefDOM;
