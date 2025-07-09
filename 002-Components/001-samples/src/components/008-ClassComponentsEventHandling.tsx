import React, { ReactNode } from 'react';

class ClassComponentEventHandling extends React.Component {

  clickHandler() {
    console.log('Button clicked!');
  };


  render(): ReactNode {
    return (
      <button onClick={this.clickHandler}>Click me</button>
    );
  }

}

export default ClassComponentEventHandling;
