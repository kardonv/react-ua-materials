import React from 'react';

interface State {
    data: string | null;
    timer: number;
    isSubscribed: boolean;
}

class ComponentDidMount extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: null,
            timer: 0,
            isSubscribed: false,
        };
        console.log('Constructor ComponentDidMount');
    }

    /**
     * Викликається один раз після першого рендеру.
     * Тут можна:
     * - робити запити до API
     * - запускати таймери
     * - підписуватись на зовнішні події
     * - виконувати DOM-маніпуляції
     */
    componentDidMount() {
        console.log('ComponentDidMount componentDidMount');

        // Симуляція API-запиту
        setTimeout(() => {
            this.setState({ data: 'Дані отримані з API' });
            console.log('API data loaded');
        }, 1500);

        // Запуск таймера
        this.timerId = window.setInterval(() => {
            this.setState((prevState) => ({ timer: prevState.timer + 1 }));
            console.log('Таймер оновлено');
        }, 1000);

        // Підписка на подію (наприклад, resize)
        window.addEventListener('resize', this.handleResize);
        this.setState({ isSubscribed: true });
        console.log('Підписка на resize');
    }

    // Зберігаємо id таймера для очищення
    timerId?: number;

    // Обробник resize
    handleResize = () => {
        console.log('Вікно змінено');
    };

    /**
     * Очищення: видаляємо таймер і підписку
     */
    componentWillUnmount() {
        if (this.timerId) {
            window.clearInterval(this.timerId);
            console.log('Таймер очищено');
        }
        window.removeEventListener('resize', this.handleResize);
        console.log('Підписка на resize очищена');
    }

    render() {
        console.log('Render ComponentDidMount');
        return (
            <div style={{ border: '2px solid green', padding: 16, margin: 16 }}>
                <h3>componentDidMount приклад</h3>
                <p>Дані з API: {this.state.data ?? 'Завантаження...'}</p>
                <p>Таймер: {this.state.timer} сек</p>
                <p>Підписка активна: {this.state.isSubscribed ? 'Так' : 'Ні'}</p>
                <p>
                    <small>
                        Відкрийте консоль, щоб побачити всі етапи життєвого циклу та дії componentDidMount.
                    </small>
                </p>
            </div>
        );
    }
}

export default ComponentDidMount;
