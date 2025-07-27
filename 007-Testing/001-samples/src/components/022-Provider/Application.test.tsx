import { render, screen, fireEvent } from '@testing-library/react';
import { Application, ThemeDisplay } from './Application';
import { createTheme, ThemeProvider } from '@mui/material';

describe('Application', () => {
    test('renders text correctly', () => {
        const theme = createTheme(
            {
                palette: {
                    mode: 'dark'
                }
            }
        );

        render(<ThemeDisplay />, {
            wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>
        });

        const heading = screen.getByRole('heading');
        expect(heading).toHaveTextContent('dark mode');
    });
});