import React from 'react';

class SetState extends React.Component<{}, { count: number }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    handleIncrement = () => {
        this.setState({
            count: this.state.count + 1,
        });
        console.log('Incremented count:', this.state.count);
    };

    handleDecrement = () => {
        this.setState((prevState) => ({ count: prevState.count - 1 }));
    };

    incrementFiveTimes = () => {
        this.handleIncrement();
        this.handleIncrement();
        this.handleIncrement();
        this.handleIncrement();
        this.handleIncrement();
    }

    render() {
        return (
            <div>
                <h2>State in Class Component</h2>
                <p>Count: {this.state.count}</p>

                <button onClick={this.handleIncrement}>Increment</button>
                <button onClick={this.incrementFiveTimes}>Increment 5 Times</button>
                <button onClick={this.handleDecrement}>Decrement</button>
            </div>
        );
    }
}

export default SetState;
