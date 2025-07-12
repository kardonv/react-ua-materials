import React from 'react';

interface ShouldComponentUpdateProps {
    value: number;
}

// Типи для стану
interface State {
    renderCount: number;
    cachedValue: number;
}

/**
 * Компонент, який демонструє реальне використання shouldComponentUpdate
 * для оптимізації рендеру: рендер відбувається лише при зміні value
 */
class ShouldComponentUpdate extends React.Component<ShouldComponentUpdateProps, State> {
    constructor(props: ShouldComponentUpdateProps) {
        super(props);
        this.state = {
            renderCount: 1,
            cachedValue: props.value,
        };
        console.log('Constructor ShouldComponentUpdate');
    }

    /**
     * Викликається перед кожним оновленням компонента.
     * Якщо value не змінився — рендер не відбудеться.
     */
    shouldComponentUpdate(nextProps: ShouldComponentUpdateProps, nextState: State): boolean {
        console.log('shouldComponentUpdate', {
            nextProps,
            nextState,
            currentProps: this.props,
            currentState: this.state,
        });
        // Рендерити тільки якщо value змінився
        return nextProps.value !== this.props.value;
    }

    /**
     * Оновлюємо renderCount тільки якщо був рендер
     */
    componentDidUpdate(prevProps: ShouldComponentUpdateProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                renderCount: this.state.renderCount + 1,
                cachedValue: this.props.value,
            });
            console.log('componentDidUpdate: value змінився');
        }
    }

    render() {
        console.log('Render ShouldComponentUpdateProps');
        return (
            <div style={{ border: '2px solid blue', padding: 16, margin: 16 }}>
                <h3>shouldComponentUpdate приклад</h3>
                <p>Value з props: {this.props.value}</p>
                <p>Кількість рендерів: {this.state.renderCount}</p>
                <p>Останнє значення value: {this.state.cachedValue}</p>
                <p>
                    <small>
                        Компонент рендериться тільки якщо value змінюється. Відкрийте консоль для деталей.
                    </small>
                </p>
            </div>
        );
    }
}

export default ShouldComponentUpdate;
