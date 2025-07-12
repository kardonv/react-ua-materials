import UseStateWithObject from './components/013-useStateWithObject';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import FunctionalComponent from './components/001-FunctionalComponents';
import ClassComponent from './components/002-ClassComponents';
import ComponentProps from './components/003-ComponentProps';
import ComponentPropsClass from './components/004-ComponentProps';
import ChildrenProp from './components/005-ChildrenProp';
import ChangingProps from './components/006-ChangingProps';

import StateInClassComponent from './components/010-State';
import SetStateDemo from './components/011-State';
import SetStateInFunctionalComponent from './components/012-State';
import FunctionalComponentEventHandling from './components/007-FunctionalComponentsEventHandling';
import ClassComponentEventHandling from './components/008-ClassComponentsEventHandling';
import ClassComponentEventHandlingProblem from './components/009-ClassComponentsEventHandlingProblem';
import UseEffectDemo from './components/014-UseEffectDemo';


function App() {

  const obj = {
    testValue: '',
  }

  const hadnleUserInput = (value: string) => {
    console.log('User input:', (window as any).a);
    obj.testValue = value;
  }

  return (
    <Router>

      <nav>
        <ul>
          <li>
            <Link to="/functional">001 Functional Component</Link>
          </li>
          <li>
            <Link to="/class">002 Class Component</Link>
          </li>
          <li>
            <Link to="/props-demo">003 Functional Component Props</Link>
          </li>
          <li>
            <Link to="/class-props">004 Class Component Props</Link>
          </li>
          <li>
            <Link to="/children-prop">005 Children Prop (Class Component)</Link>
          </li>
          <li>
            <Link to="/changing-props">006 Changing Props Demo</Link>
          </li>
          <li>
            <Link to="/functional-components-event-handling">007 Functional Components Event Handling</Link>
          </li>
          <li>
            <Link to="/class-components-event-handling">008 Class Components Event Handling</Link>
          </li>
          <li>
            <Link to="/class-components-event-handling-problem">009 Class Components Event Handling Problem</Link>
          </li>
          <li>
            <Link to="/state-in-class">010 State in Class Component</Link>
          </li>
          <li>
            <Link to="/setstate-demo">011 setState State Loss</Link>
          </li>
          <li>
            <Link to="/setstate-functional">012 setState State Functional</Link>
          </li>
          <li>
            <Link to="/use-state-with-object">013 useState With Object</Link>
          </li>
          <li>
            <Link to="/use-effect-demo">014 useEffect Demo</Link>
          </li>
        </ul>
      </nav>

      <div style={{ border: '1px solid #888', padding: '16px', borderRadius: '8px' }}>

        <Routes>
          <Route path="/functional" element={<FunctionalComponent />} />
          <Route path="/class" element={<ClassComponent />} />
          <Route path="/props-demo" element={
            <ComponentProps
              title="Props in functional component"
              count={42}
              handleInput={hadnleUserInput}
            />} />
          <Route path="/class-props" element={<ComponentPropsClass title="Props in class component" value={100} />} />
          <Route path="/children-prop" element={
            <ChildrenProp>
              <p>This is a child element passed to the class component.</p>
              <button>Click Me</button>
            </ChildrenProp>
          } />
          <Route path="/changing-props" element={<ChangingProps initialValue="Hello, props!" />} />
          <Route path="/functional-components-event-handling" element={<FunctionalComponentEventHandling />} />
          <Route path="/class-components-event-handling" element={<ClassComponentEventHandling />} />
          <Route path="/class-components-event-handling-problem" element={<ClassComponentEventHandlingProblem />} />
          <Route path="/state-in-class" element={
            <>
              <StateInClassComponent />
              <StateInClassComponent />
            </>
          } />
          <Route path="/setstate-demo" element={<SetStateDemo />} />
          <Route path="/setstate-functional" element={<SetStateInFunctionalComponent />} />
          <Route path="/use-state-with-object" element={<UseStateWithObject />} />
          <Route path="/use-effect-demo" element={<UseEffectDemo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
