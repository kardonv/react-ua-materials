import React, { useRef, useImperativeHandle, forwardRef } from 'react';
/**
 * Створення імперативних API в компонентах
 */
const ImperativeInput = forwardRef((props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            if (inputRef.current) {
                inputRef.current.focus();
                console.log('Imperative focus');
            }
        }
    }));

    return <input ref={inputRef} type='text' />;
});

function UseRefImperative() {
    const inputRef = useRef<{ focus: () => void }>(null);

    return (
        <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
            <ImperativeInput ref={inputRef} />
            <button onClick={() => inputRef.current?.focus()}>Focus via imperative API</button>
        </div>
    );
}
export default UseRefImperative;
