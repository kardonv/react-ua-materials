import React from 'react';

interface CounterProps {
    counter: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
}

export function Counter({ counter, handleIncrement, handleDecrement }: CounterProps) {

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2 data-testid="counter-title">Counter</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <button 
                    onClick={handleDecrement}
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
                    {counter}
                </span>
                
                <button 
                    onClick={handleIncrement}
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