import React, { useState } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ComponentViewer } from './components/ComponentViewer';

function App() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleFolderClick = (folderKey: string) => {
    setActiveDropdown(activeDropdown === folderKey ? null : folderKey);
  };

  const handleComponentClick = (folderKey: string, componentKey: string) => {
    setSelectedFolder(folderKey);
    setSelectedComponent(componentKey);
    setActiveDropdown(null);
  };

  return (
    <div className="App">
      <Navigation
        selectedFolder={selectedFolder}
        selectedComponent={selectedComponent}
        activeDropdown={activeDropdown}
        onFolderClick={handleFolderClick}
        onComponentClick={handleComponentClick}
        onDropdownChange={setActiveDropdown}
      />

      <main className="main-content">
        {selectedFolder && selectedComponent ? (
          <ComponentViewer
            selectedFolder={selectedFolder}
            selectedComponent={selectedComponent}
          />
        ) : (
          <WelcomeScreen onComponentSelect={handleComponentClick} />
        )}
      </main>
    </div>
  );
}

export default App;
