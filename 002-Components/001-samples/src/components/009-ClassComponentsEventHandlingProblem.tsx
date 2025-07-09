import React, { ReactNode } from 'react';

interface ClassComponentEventHandlingProps {
}

class ClassComponentEventHandlingProblem extends React.Component<ClassComponentEventHandlingProps> {
  private name: string;


  constructor(props: ClassComponentEventHandlingProps) {
    super(props);
    console.log('ClassComponentEventHandlingProblem constructor called');

    this.name = 'ClassComponentEventHandlingProblem';
  }

  clickHandler() {
    console.log('Button clicked!', this.name);
  };


  render(): ReactNode {
    return (
      <>
        <h3>Class Component Event Handling Problem</h3>
        
        <button onClick={this.clickHandler}>Click me</button>

        <button onClick={() => this.clickHandler()}>Click me</button>
        <button onClick={this.clickHandler.bind(this)}>Click me</button>
      </>
    );
  }

}

export default ClassComponentEventHandlingProblem;
