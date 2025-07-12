/**
 * Презентаційний компонент: відповідає лише за відображення даних
 * Не містить логіки чи стану, отримує все через props
 */
interface MessagesListProps {
    messages: string[];
}

function MessagesList({ messages }: MessagesListProps) {
    return (
        <div style={{ border: '1px solid #aaa', padding: 8, marginBottom: 8 }}>
            <h3>Список повідомлень</h3>
            {messages.length === 0 ? (
                <p style={{ color: '#888' }}>Повідомлень немає</p>
            ) : (
                <ul>
                    {messages.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MessagesList;