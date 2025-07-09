import React from 'react';

interface ChangingPropsProps {
    initialValue: string;
}

class ChangingProps extends React.Component<ChangingPropsProps> {
    render() {
        // this.props.initialValue = 'New Value';

        return (
            <div>
                <h2>Changing Props Demo</h2>
                <p>Props are read-only. You cannot reassign this.props.initialValue inside the component.</p>
                <p>Initial Value: {this.props.initialValue}</p>
                {/* <button onClick={() => { this.props.initialValue = 'New Value'; }}>Try to change</button> */}
                <p style={{ color: 'red' }}><b>Note:</b> Props are immutable. To change a value, use state in the parent and pass a new prop value down.</p>
            </div>
        );
    }
}

export default ChangingProps;
