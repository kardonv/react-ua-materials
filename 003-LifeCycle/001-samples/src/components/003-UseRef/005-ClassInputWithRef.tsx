import React, { Component, createRef } from 'react';

class ClassInputWithRef extends Component {
    inputRef = createRef<HTMLInputElement>();

    focusInput = () => {
        if (this.inputRef.current) {
            this.inputRef.current.focus();
            console.log('Class component: input focused');
        }
    };

    render() {
        return (
            <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
                <input ref={this.inputRef} type='text' />
                <button onClick={this.focusInput}>Focus input</button>
            </div>
        );
    }
}

export default ClassInputWithRef;