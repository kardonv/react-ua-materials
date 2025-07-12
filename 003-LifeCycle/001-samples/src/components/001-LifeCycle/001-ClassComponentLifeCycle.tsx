import React from 'react';

interface State {
    count: number;
    hasError: boolean;
}

interface ClassComponentLifeCycleProps {}

class ClassComponentLifeCycle extends React.Component<ClassComponentLifeCycleProps, State> {
    /**
     * Викликається при створенні компонента. 
     * Ініціалізація стану та прив’язка методів.
     */
    constructor(props: {}) {
        super(props);
        this.state = {
            count: 0,
            hasError: false,
        };
        console.log('constructor');
    }

    /**
     * Викликається перед кожним рендером — як при монтуванні, так і при оновленні.
     * Дозволяє оновити стан на основі змін в пропсах.
     */
    static getDerivedStateFromProps(nextProps: ClassComponentLifeCycleProps, prevState: State): State | null {
        console.log('getDerivedStateFromProps');
        console.log('nextProps:', nextProps, 'prevState:', prevState);
        return null; // Можна повернути новий обʼєкт стану
    }

    /**
     * Викликається один раз після першого рендеру.
     * Ідеальне місце для запитів до API, підписок і DOM-маніпуляцій.
     */
    componentDidMount() {
        console.log('componentDidMount');
    }

    /**
     * Контролює, чи варто виконувати оновлення компонента.
     * Повертає true або false.
     */
    shouldComponentUpdate(nextProps: {}, nextState: State): boolean {
        console.log('shouldComponentUpdate');
        console.log('nextProps:', nextProps, 'nextState:', nextState, 'currentState:', this.state);
        return true;
    }

    /**
     * Викликається прямо перед оновленням DOM.
     * Може повернути snapshot (наприклад, scroll position), який передається в componentDidUpdate.
     */
    getSnapshotBeforeUpdate(prevProps: {}, prevState: State): null {
        console.log('getSnapshotBeforeUpdate');
        console.log('nextProps:', prevProps, 'prevState:', prevState, 'currentState:', this.state);
        return null;
    }

    /**
     * Викликається одразу після оновлення компонента.
     * Використовується для реакції на зміни в DOM або оновлення даних.
     */
    componentDidUpdate(prevProps: {}, prevState: State, snapshot: null): void {
        console.log('componentDidUpdate');
        console.log('prevProps:', prevProps, 'prevState:', prevState, 'currentState:', this.state);
    }

    /**
     * Викликається перед видаленням компонента з DOM.
     * Використовується для очищення таймерів, скасування підписок тощо.
     */
    componentWillUnmount(): void {
        console.log('componentWillUnmount');
    }

    /**
     * Обробка помилок: якщо дочірній компонент кидає помилку — цей метод зловить її.
     * Оновлює стан, щоб відобразити UI помилки.
     */
    static getDerivedStateFromError(error: Error): Partial<State> {
        console.log('getDerivedStateFromError');
        return { hasError: true };
    }

    /**
     * Додатковий метод обробки помилок.
     * Можна логувати помилки або показувати повідомлення користувачеві.
     */
    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        console.log('componentDidCatch', error, info);
    }

    /**
     * Обробник натискання кнопки
     */
    handleClick = (): void => {
        this.setState((prevState) => ({ count: prevState.count + 1 }));
    };

    /**
     * Основний метод відображення компонента.
     */
    render(): React.ReactNode {
        console.log('Render');

        if (this.state.hasError) {
            return <h2>Щось пішло не так.</h2>;
        }

        return (
            <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
                <h3>Життєвий цикл компонента</h3>
                <p>Лічильник: {this.state.count}</p>
                <button onClick={this.handleClick}>Збільшити</button>
            </div>
        );
    }
}

export default ClassComponentLifeCycle;
