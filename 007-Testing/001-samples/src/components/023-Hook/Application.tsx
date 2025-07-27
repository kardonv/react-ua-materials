import React from 'react';
import { useCounter } from './hooks/useCounter';

export function Application() {
    const { count, increment, decrement } = useCounter();

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1 data-testid="app-title">useCounter Hook Example</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <button 
                    onClick={decrement}
                    data-testid="decrement-btn"
                    style={{ 
                        padding: '10px 20px', 
                        fontSize: '18px',
                        borderRadius: '4px', 
                        border: 'none', 
                        cursor: 'pointer', 
                        backgroundColor: '#dc3545', 
                        color: 'white' 
                    }}
                >
                    -
                </button>
                
                <span data-testid="count" style={{ fontSize: '24px', fontWeight: 'bold', minWidth: '60px' }}>
                    {count}
                </span>
                
                <button 
                    onClick={increment}
                    data-testid="increment-btn"
                    style={{ 
                        padding: '10px 20px', 
                        fontSize: '18px',
                        borderRadius: '4px', 
                        border: 'none', 
                        cursor: 'pointer', 
                        backgroundColor: '#28a745', 
                        color: 'white' 
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
}
