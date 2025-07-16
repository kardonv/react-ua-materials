import React from 'react';
import { componentMap } from './componentMap';

interface ComponentViewerProps {
  selectedFolder: string | null;
  selectedComponent: string | null;
}

export const ComponentViewer: React.FC<ComponentViewerProps> = ({
  selectedFolder,
  selectedComponent
}) => {
  if (!selectedFolder || !selectedComponent) return null;

  const SelectedComponent = componentMap[selectedFolder as keyof typeof componentMap]
    .components[selectedComponent as keyof typeof componentMap[keyof typeof componentMap]['components']];

  return (
    <div>
      <div className="component-header">
        <h2 className="component-title">{selectedComponent}</h2>
        <p className="component-subtitle">
          Folder: {componentMap[selectedFolder as keyof typeof componentMap].title}
        </p>
      </div>
      
      <div className="component-container">
        {React.createElement(SelectedComponent)}
      </div>
    </div>
  );
}; 