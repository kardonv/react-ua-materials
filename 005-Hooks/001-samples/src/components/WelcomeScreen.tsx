import React from 'react';
import { componentMap } from './componentMap';

interface WelcomeScreenProps {
  onComponentSelect: (folderKey: string, componentKey: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComponentSelect }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-icon">⚛️</div>
      <h2 className="welcome-title">
        Welcome to React Hooks Examples
      </h2>
      <p className="welcome-description">
        Explore comprehensive examples of React hooks including useMemo, useCallback, useReducer, 
        custom hooks, useLayoutEffect, useDebugValue, and useImperativeHandle.
      </p>
      <div className="folder-grid">
        {Object.entries(componentMap).map(([folderKey, folderData]) => (
          <div 
            key={folderKey} 
            className="folder-card"
            onClick={() => {
              const firstComponent = Object.keys(folderData.components)[0];
              onComponentSelect(folderKey, firstComponent);
            }}
          >
            <h3 className="folder-title">{folderData.title}</h3>
            <p className="folder-count">
              {Object.keys(folderData.components).length} example{Object.keys(folderData.components).length !== 1 ? 's' : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}; 