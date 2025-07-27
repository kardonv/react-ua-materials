import React from 'react';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';
import {
    themeStyles,
    containerStyles,
    titleContainerStyles,
    buttonContainerStyles,
    getToggleButtonStyles,
    setLightButtonStyles,
    setDarkButtonStyles,
    descriptionContainerStyles
} from './styles';

function ThemeDisplay() {
    const { theme, toggleTheme, setTheme } = useTheme();

    return (
        <div 
            style={{
                ...containerStyles,
                ...themeStyles[theme]
            }}
            data-testid="theme-container"
        >
            <h1 data-testid="theme-title">Theme Example</h1>
            
            <div style={titleContainerStyles}>
                <p data-testid="current-theme">
                    Current theme: <strong>{theme}</strong>
                </p>
            </div>

            <div style={buttonContainerStyles}>
                <button 
                    onClick={toggleTheme}
                    data-testid="toggle-theme-btn"
                    style={getToggleButtonStyles(theme)}
                >
                    Toggle Theme
                </button>

                <button 
                    onClick={() => setTheme('light')}
                    data-testid="set-light-btn"
                    style={setLightButtonStyles}
                >
                    Set Light
                </button>

                <button 
                    onClick={() => setTheme('dark')}
                    data-testid="set-dark-btn"
                    style={setDarkButtonStyles}
                >
                    Set Dark
                </button>
            </div>

            <div style={descriptionContainerStyles}>
                <p data-testid="theme-description">
                    {theme === 'light' 
                        ? 'This is the light theme with white background and dark text.'
                        : 'This is the dark theme with dark background and light text.'
                    }
                </p>
            </div>
        </div>
    );
}

export function Application() {
    return (
        <ThemeProvider>
            <ThemeDisplay />
        </ThemeProvider>
    );
} 