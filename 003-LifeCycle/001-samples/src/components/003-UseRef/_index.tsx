
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UseRefDOM from './001-UseRefDOM';
import UseRefMutable from './002-UseRefMutable';
import UseRefPrevValue from './003-UseRefPrevValue';
import UseRefAsyncControl from './004-UseRefAsyncControl';
import ClassInputWithRef from './005-ClassInputWithRef';
import ParentComponentWithRef from './006-ParentComponentWithRef';
import UseRefImperative from './007-UseRefImperative';

const UseRefIndex = () => (
  <div>
    <h2>Використання useRef</h2>
    <nav>
      <ul>
        <li><Link to="/useref/dom">DOM Example</Link></li>
        <li><Link to="/useref/mutable">Mutable Example</Link></li>
        <li><Link to="/useref/prev-value">Prev Value Example</Link></li>
        <li><Link to="/useref/async-control">Async Control Example</Link></li>
        <li><Link to="/useref/class-input">Class Input With Ref</Link></li>
        <li><Link to="/useref/parent-ref">Parent Component With Ref</Link></li>
        <li><Link to="/useref/imperative">Imperative Handle Example</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="dom" element={<UseRefDOM />} />
      <Route path="mutable" element={<UseRefMutable />} />
      <Route path="prev-value" element={<UseRefPrevValue />} />
      <Route path="async-control" element={<UseRefAsyncControl />} />
      <Route path="class-input" element={<ClassInputWithRef />} />
      <Route path="parent-ref" element={<ParentComponentWithRef />} />
      <Route path="imperative" element={<UseRefImperative />} />
    </Routes>
  </div>
);

export default UseRefIndex;
