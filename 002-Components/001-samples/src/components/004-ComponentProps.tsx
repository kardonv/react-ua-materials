import React from 'react';

interface IClassComponentProps {
  title: string;
  value: number;
}

class ComponentPropsClass extends React.Component<IClassComponentProps> {
  render() {
    const { title, value } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        <p>Value: {value}</p>
      </div>
    );
  }
}

export default ComponentPropsClass;
