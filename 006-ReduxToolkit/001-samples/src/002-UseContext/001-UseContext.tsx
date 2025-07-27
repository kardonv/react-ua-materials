import React from 'react';
import './UseContext.css';
import { App } from './components';

export function UseContext() {
  return (
    <div className="use-context-demo">
      <h1>React Context Example</h1>

      <div className="demo-app">
        <App />
      </div>
    </div>
  );
};

export default UseContext; 