import { render, screen, fireEvent } from '@testing-library/react';
import { Application } from './Application';
import { ThemeProvider } from './providers/ThemeProvider';

describe('Application with ThemeProvider', () => {
    test('renders with default light theme', () => {
        render(<Application />);

        // Check that the theme container is rendered
        const themeContainer = screen.getByTestId('theme-container');
        expect(themeContainer).toBeInTheDocument();

        // Check that the title is rendered
        const title = screen.getByTestId('theme-title');
        expect(title).toHaveTextContent('Theme Example');

        // Check that current theme shows light by default
        const currentTheme = screen.getByTestId('current-theme');
        expect(currentTheme).toHaveTextContent('Current theme: light');

        // Check that theme description shows light theme text
        const themeDescription = screen.getByTestId('theme-description');
        expect(themeDescription).toHaveTextContent('This is the light theme with white background and dark text.');
    });

    test('renders all theme control buttons', () => {
        render(<Application />);

        // Check that all buttons are present
        const toggleButton = screen.getByTestId('toggle-theme-btn');
        const setLightButton = screen.getByTestId('set-light-btn');
        const setDarkButton = screen.getByTestId('set-dark-btn');

        expect(toggleButton).toBeInTheDocument();
        expect(setLightButton).toBeInTheDocument();
        expect(setDarkButton).toBeInTheDocument();

        expect(toggleButton).toHaveTextContent('Toggle Theme');
        expect(setLightButton).toHaveTextContent('Set Light');
        expect(setDarkButton).toHaveTextContent('Set Dark');
    });

    test('toggle theme button changes theme from light to dark', () => {
        render(<Application />);

        // Initially should be light theme
        let currentTheme = screen.getByTestId('current-theme');
        expect(currentTheme).toHaveTextContent('Current theme: light');

        // Click toggle button
        const toggleButton = screen.getByTestId('toggle-theme-btn');
        fireEvent.click(toggleButton);

        // Should now be dark theme
        currentTheme = screen.getByTestId('current-theme');
        expect(currentTheme).toHaveTextContent('Current theme: dark');

        // Theme description should update
        const themeDescription = screen.getByTestId('theme-description');
        expect(themeDescription).toHaveTextContent('This is the dark theme with dark background and light text.');
    });

    test('set light button sets theme to light', () => {
        render(<Application />);

        // First toggle to dark
        const toggleButton = screen.getByTestId('toggle-theme-btn');
        fireEvent.click(toggleButton);

        // Verify it's dark
        let currentTheme = screen.getByTestId('current-theme');
        expect(currentTheme).toHaveTextContent('Current theme: dark');

        // Click set light button
        const setLightButton = screen.getByTestId('set-light-btn');
        fireEvent.click(setLightButton);

        // Should be light again
        currentTheme = screen.getByTestId('current-theme');
        expect(currentTheme).toHaveTextContent('Current theme: light');
    });

    test('set dark button sets theme to dark', () => {
        render(<Application />);

        // Initially should be light
        let currentTheme = screen.getByTestId('current-theme');
        expect(currentTheme).toHaveTextContent('Current theme: light');

        // Click set dark button
        const setDarkButton = screen.getByTestId('set-dark-btn');
        fireEvent.click(setDarkButton);

        // Should be dark
        currentTheme = screen.getByTestId('current-theme');
        expect(currentTheme).toHaveTextContent('Current theme: dark');
    });

    test('multiple theme changes work correctly', () => {
        render(<Application />);

        // Start with light
        let currentTheme = screen.getByTestId('current-theme');
        expect(currentTheme).toHaveTextContent('Current theme: light');

        // Toggle to dark
        const toggleButton = screen.getByTestId('toggle-theme-btn');
        fireEvent.click(toggleButton);
        expect(currentTheme).toHaveTextContent('Current theme: dark');

        // Toggle back to light
        fireEvent.click(toggleButton);
        expect(currentTheme).toHaveTextContent('Current theme: light');

        // Set to dark
        const setDarkButton = screen.getByTestId('set-dark-btn');
        fireEvent.click(setDarkButton);
        expect(currentTheme).toHaveTextContent('Current theme: dark');

        // Set to light
        const setLightButton = screen.getByTestId('set-light-btn');
        fireEvent.click(setLightButton);
        expect(currentTheme).toHaveTextContent('Current theme: light');
    });
});

// Test ThemeProvider directly
describe('ThemeProvider', () => {
    test('provides theme context with default light theme', () => {
        const TestComponent = () => {
            const { theme } = require('./providers/ThemeProvider').useTheme();
            return <div data-testid="theme-value">{theme}</div>;
        };

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const themeValue = screen.getByTestId('theme-value');
        expect(themeValue).toHaveTextContent('light');
    });

    test('provides theme context with custom initial theme', () => {
        const TestComponent = () => {
            const { theme } = require('./providers/ThemeProvider').useTheme();
            return <div data-testid="theme-value">{theme}</div>;
        };

        render(
            <ThemeProvider initialTheme="dark">
                <TestComponent />
            </ThemeProvider>
        );

        const themeValue = screen.getByTestId('theme-value');
        expect(themeValue).toHaveTextContent('dark');
    });

    test('throws error when useTheme is used outside ThemeProvider', () => {
        const TestComponent = () => {
            const { theme } = require('./providers/ThemeProvider').useTheme();
            return <div>{theme}</div>;
        };

        // Suppress console.error for this test
        const originalError = console.error;
        console.error = jest.fn();

        expect(() => {
            render(<TestComponent />);
        }).toThrow('useTheme must be used within a ThemeProvider');

        // Restore console.error
        console.error = originalError;
    });
}); 