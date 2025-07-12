import React, { useState } from 'react';

import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import LifeCycleIndex from './components/001-LifeCycle/_index';
import ComponentsIndex from './components/002-Components/_index';
import UseRefIndex from './components/003-UseRef/_index';


function App() {
  return (
    <div className="App" style={{padding: '6px'}}>
      <Router>
        <nav>
          <Link to="/lifecycle">1. Життєвий цикл</Link> <br />
          <Link to="/components">2. Компоненти</Link> <br />
          <Link to="/useref">3.useRef</Link> <br />
        </nav>
        <Routes>
          <Route path="/lifecycle/*" element={<LifeCycleIndex />} />
          <Route path="/components/*" element={<ComponentsIndex />} />
          <Route path="/useref/*" element={<UseRefIndex />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
