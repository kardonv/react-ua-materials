import React, { useState } from 'react';
import './App.css';
import { PropsDrilling } from './001-PropsDrilling/PropsDrilling';
import { UseContext } from './002-UseContext/001-UseContext';
import ReduxExample from './003-Redux/001-Redux';
import ReduxShopExample from './004-ReduxShop/001-Redux';
import ReduxShopHooksExample from './005-ReduxShopHooks/001-Redux';
import ReduxShopExtendedExample from './006-ReduxShopExtended/001-Redux';
import ReduxAsyncActionExample from './007-ReduxAsyncAction/001-Redux';

type ExampleType = 'props-drilling' | 'use-context' | 'redux' | 'redux-shop' | 'redux-hooks' | 'redux-extended' | 'redux-async';

function App() {
  const [currentExample, setCurrentExample] = useState<ExampleType>('props-drilling');

  const renderExample = () => {
    switch (currentExample) {
      case 'props-drilling':
        return <PropsDrilling />;
      case 'use-context':
        return <UseContext />;
      case 'redux':
        return <ReduxExample />;
      case 'redux-shop':
        return <ReduxShopExample />;
      case 'redux-hooks':
        return <ReduxShopHooksExample />;
      case 'redux-extended':
        return <ReduxShopExtendedExample />;
      case 'redux-async':
        return <ReduxAsyncActionExample />;
      default:
        return <PropsDrilling />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">React State Management Examples</h1>
          <div className="nav-links">
            <button
              className={`nav-link ${currentExample === 'props-drilling' ? 'active' : ''}`}
              onClick={() => setCurrentExample('props-drilling')}
            >
              Props Drilling
            </button>
            <button
              className={`nav-link ${currentExample === 'use-context' ? 'active' : ''}`}
              onClick={() => setCurrentExample('use-context')}
            >
              Use Context
            </button>
            <button
              className={`nav-link ${currentExample === 'redux' ? 'active' : ''}`}
              onClick={() => setCurrentExample('redux')}
            >
              Redux Basic
            </button>
            <button
              className={`nav-link ${currentExample === 'redux-shop' ? 'active' : ''}`}
              onClick={() => setCurrentExample('redux-shop')}
            >
              Redux Shop
            </button>
            <button
              className={`nav-link ${currentExample === 'redux-hooks' ? 'active' : ''}`}
              onClick={() => setCurrentExample('redux-hooks')}
            >
              Redux Shop Hooks
            </button>
            <button
              className={`nav-link ${currentExample === 'redux-extended' ? 'active' : ''}`}
              onClick={() => setCurrentExample('redux-extended')}
            >
              Redux Shop Extended
            </button>
            <button
              className={`nav-link ${currentExample === 'redux-async' ? 'active' : ''}`}
              onClick={() => setCurrentExample('redux-async')}
            >
              Redux Async Action
            </button>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        {renderExample()}
      </main>
    </div>
  );
}

export default App;
