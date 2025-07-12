import React, { useEffect, useState } from 'react';

interface UseEffectAfterRenderProps {
    initialValue: number;
}

/**
 * Викликає функцію після першого рендеру (аналог componentDidMount)
 */
function UseEffectAfterRender({ initialValue }: UseEffectAfterRenderProps) {
    console.log('UseEffectAfterRender');

    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        // Виконається лише один раз після монтування
        console.log('ComponentDidMount!');
    }, []);


    return (
        <div style={{ border: '2px solid orange', padding: 16, margin: 16 }}>
            <p>Виклик функцій після рендеру. Value = {value}</p>
            <button onClick={() => setValue(value + 1)}>Change value</button>
        </div>
    );
}
export default UseEffectAfterRender;
