import React from 'react';

interface GetSnapshotBeforeUpdateProps {
    messages: string[];
}

interface GetSnapshotBeforeUpdateState {
    messages: string[];
}

/**
 * Компонент, який демонструє реальне використання getSnapshotBeforeUpdate
 * для збереження позиції скролу перед оновленням DOM
 */
class GetSnapshotBeforeUpdate extends React.Component<GetSnapshotBeforeUpdateProps, GetSnapshotBeforeUpdateState> {
    private listRef: React.RefObject<HTMLDivElement | null>;

    constructor(props: GetSnapshotBeforeUpdateProps) {
        super(props);
        this.state = {
            messages: props.messages,
        };
        this.listRef = React.createRef();
        console.log('constructor');
    }

    /**
     * Оновлюємо стан, якщо messages змінилися
     */
    static getDerivedStateFromProps(nextProps: GetSnapshotBeforeUpdateProps, prevState: GetSnapshotBeforeUpdateState): Partial<GetSnapshotBeforeUpdateState> | null {
        if (nextProps.messages !== prevState.messages) {
            return { messages: nextProps.messages };
        }
        return null;
    }

    /**
     * Зберігаємо позицію скролу перед оновленням DOM
     */
    getSnapshotBeforeUpdate(prevProps: GetSnapshotBeforeUpdateProps, prevState: GetSnapshotBeforeUpdateState): number | null {
        console.log('getSnapshotBeforeUpdate')
        if (this.listRef.current) {
            const scrollPosition = this.listRef.current.scrollTop;
            console.log('getSnapshotBeforeUpdate: scrollTop', scrollPosition);
            return this.listRef.current.scrollHeight - this.listRef.current.scrollTop;
        }

        return null;
    }

    /**
     * Після оновлення можна використати snapshot для відновлення скролу
     */
    componentDidUpdate(prevProps: GetSnapshotBeforeUpdateProps, prevState: GetSnapshotBeforeUpdateState, snapshot: number | null) {
        if (snapshot !== null && this.listRef.current) {
            this.listRef.current.scrollTop = this.listRef.current.scrollHeight - snapshot;
            console.log('componentDidUpdate: scrollTop restored', snapshot);
        }
    }

    render() {
        console.log('Render');
        return (
            <div style={{ border: '2px solid orange', padding: 16, margin: 16 }}>
                <h3>getSnapshotBeforeUpdate приклад</h3>
                <div
                    ref={this.listRef}
                    style={{ height: 100, overflowY: 'auto', background: '#f9f9f9', marginBottom: 8 }}
                >
                    {this.state.messages.map((msg, idx) => (
                        <div key={idx}>{msg}</div>
                    ))}
                </div>
                <p>
                    <small>
                        Додавайте нові повідомлення, скрол буде збережено. Відкрийте консоль для деталей.
                    </small>
                </p>
            </div>
        );
    }
}

export default GetSnapshotBeforeUpdate;
