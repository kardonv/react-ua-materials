import React from 'react';
import './PropsDrilling.css';
import { App } from './components';


export function PropsDrilling() {
  return (
    <div className="props-drilling-demo">
      <h1>Props Drilling Example</h1>

      <div className="demo-app">
        <App />
      </div>
    </div>
  );
};

export default PropsDrilling; 