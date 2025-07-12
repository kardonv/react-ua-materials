import React from 'react';

interface Props {
    value: number;
}

interface State {
    derivedValue: number;
    prevPropValue: number;
}

class GetDerivedStateFromProps extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            derivedValue: props.value * 2,
            prevPropValue: props.value,
        };
        console.log('constructor');
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State): Partial<State> | null {
        console.log('nextProps: ', nextProps, ' prevState: ', prevState)
        if (nextProps.value !== prevState.prevPropValue) {
            console.log('getDerivedStateFromProps: value changed', nextProps.value);
            return {
                derivedValue: nextProps.value * 2,
                prevPropValue: nextProps.value,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        console.log('GetDerivedStateFromProps componentDidUpdate', { prevProps, prevState, currentState: this.state });
    }

    render() {
        console.log('Render GetDerivedStateFromProps');
        return (
            <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
                <h3>GetDerivedStateFromProps Example</h3>
                <p>Prop value: {this.props.value}</p>
                <p>Derived value (value * 2): {this.state.derivedValue}</p>
            </div>
        );
    }
}

export default GetDerivedStateFromProps;