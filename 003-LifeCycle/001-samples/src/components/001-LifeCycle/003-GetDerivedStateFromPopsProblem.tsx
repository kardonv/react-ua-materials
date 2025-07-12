import React from "react";

interface Props {
    value: number;
}

interface State {
    derivedValue: number;
}

class GetDerivedStateFromPropsProblem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            derivedValue: props.value * 2,
        };
        console.log('Constructor GetDerivedStateFromPropsProblem');
    }

    // Проблемний приклад: завжди повертає новий обʼєкт
    static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
        console.log('getDerivedStateFromProps: always returns new object', nextProps.value);
        return {
            derivedValue: nextProps.value * 2,
        };
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        console.log('componentDidUpdate', { prevProps, prevState, currentState: this.state });
    }

    render() {
        console.log('Render GetDerivedStateFromPropsProblem');
        return (
            <div style={{ border: '2px solid red', padding: 16, margin: 16 }}>
                <h3>GetDerivedStateFromProps Problem Example</h3>
                <p>Prop value: {this.props.value}</p>
                <p>Derived value (value * 2): {this.state.derivedValue}</p>
                <p style={{ color: 'red' }}>
                    ⚠️ Цей компонент завжди оновлюється, навіть якщо value не змінюється!
                </p>
            </div>
        );
    }
}

export default GetDerivedStateFromPropsProblem;
