import React from 'react';

import { createTheme, ThemeProvider, Typography, useTheme } from '@mui/material';
const theme = createTheme(
    {
        palette: {
            mode: 'dark'
        }
    }
);

export function ThemeDisplay() {
    const theme = useTheme();

    return (
        <Typography component="h1">{`${theme.palette.mode} mode`}</Typography>   
    )
}

export function Application() {
    return (
        <ThemeProvider theme={theme}>
            <ThemeDisplay />
        </ThemeProvider>
    );
} 