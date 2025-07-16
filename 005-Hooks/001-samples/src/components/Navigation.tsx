import React from 'react';
import { componentMap } from './componentMap';

interface NavigationProps {
  selectedFolder: string | null;
  selectedComponent: string | null;
  activeDropdown: string | null;
  onFolderClick: (folderKey: string) => void;
  onComponentClick: (folderKey: string, componentKey: string) => void;
  onDropdownChange: (folderKey: string | null) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  selectedFolder,
  selectedComponent,
  activeDropdown,
  onFolderClick,
  onComponentClick,
  onDropdownChange
}) => {
  return (
    <header className="app-header">
      <div className="header-container">
        
        <nav className="nav-menu">
          {Object.entries(componentMap).map(([folderKey, folderData]) => (
            <div key={folderKey} className="nav-item">
              <button
                onClick={() => onFolderClick(folderKey)}
                className={`nav-button ${activeDropdown === folderKey ? 'active' : ''}`}
                onMouseEnter={() => onDropdownChange(folderKey)}
              >
                {folderData.title}
                <span className="nav-button-arrow">▼</span>
              </button>
              
              {activeDropdown === folderKey && (
                <div 
                  className="dropdown-menu"
                  onMouseLeave={() => onDropdownChange(null)}
                >
                  {Object.entries(folderData.components).map(([componentKey]) => (
                    <button
                      key={componentKey}
                      onClick={() => onComponentClick(folderKey, componentKey)}
                      className="dropdown-item"
                    >
                      <span className={`dropdown-indicator ${selectedFolder === folderKey && selectedComponent === componentKey ? 'active' : ''}`} />
                      {componentKey}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}; 