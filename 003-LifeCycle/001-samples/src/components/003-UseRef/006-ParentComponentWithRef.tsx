import React, { Component, createRef } from 'react';

class ChildInput extends Component<{}, {}> {
    inputRef: HTMLInputElement | null = null;

    focus() {
        if (this.inputRef) {
            this.inputRef.focus();
            console.log('ChildInput: input focused');
        }
    }

    render() {
        return (
            <div style={{ border: '1px solid blue', padding: 16, margin: 16 }}>
                <input ref={el => { this.inputRef = el; }} type='text' />
            </div>
        );
    }
}

class ParentComponentWithRef extends Component {
    childRef = createRef<ChildInput>();

    handleFocus = () => {
        if (this.childRef.current) {
            this.childRef.current.focus();
        }
    };

    render() {
        return (
            <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
                <ChildInput ref={this.childRef} />
                <button onClick={this.handleFocus}>Focus child input</button>
            </div>
        );
    }
}

export default ParentComponentWithRef;