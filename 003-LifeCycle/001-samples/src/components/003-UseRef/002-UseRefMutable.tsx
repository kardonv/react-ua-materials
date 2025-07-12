import React, { useRef } from 'react';
/**
 * Збереження мутабельного значення між рендерами
 */
function UseRefMutable() {
    const countRef = useRef(0);

    const handleClick = () => {
        countRef.current++;
        console.log('Ref value:', countRef.current);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
            <button onClick={handleClick}>Increment ref value {countRef.current}</button>
        </div>
    );
}
export default UseRefMutable;
