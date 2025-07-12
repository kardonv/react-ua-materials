import React, { useState } from 'react';
import MessagesList from './PresentationalMessagesList';

/**
 * Контейнерний компонент: відповідає за логіку, стан та взаємодію з даними
 */
function ContainerMessages() {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    /**
     * Додає нове повідомлення
     */
    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([...messages, inputValue]);
            setInputValue('');
        }
    };

    return (
        <div style={{ border: '2px solid #007bff', padding: 16, margin: 16 }}>
            <h2>Контейнерний компонент</h2>

            <MessagesList messages={messages} />

            <input
                type='text'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder='Введіть повідомлення'
                style={{ marginRight: 8 }}
            />
            <button onClick={handleSend}>Відправити</button>
        </div>
    );
};

export default ContainerMessages;
