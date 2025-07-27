export const themeStyles = {
    light: {
        backgroundColor: '#ffffff',
        color: '#333333',
        border: '1px solid #cccccc'
    },
    dark: {
        backgroundColor: '#333333',
        color: '#ffffff',
        border: '1px solid #666666'
    }
};

export const containerStyles = {
    padding: '20px',
    borderRadius: '8px'
};

export const titleContainerStyles = {
    marginBottom: '20px'
};

export const buttonContainerStyles = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap' as const
};

export const baseButtonStyles = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
};

export const getToggleButtonStyles = (theme: 'light' | 'dark') => ({
    ...baseButtonStyles,
    backgroundColor: theme === 'light' ? '#007bff' : '#28a745',
    color: 'white'
});

export const setLightButtonStyles = {
    ...baseButtonStyles,
    backgroundColor: '#ffc107',
    color: '#333'
};

export const setDarkButtonStyles = {
    ...baseButtonStyles,
    backgroundColor: '#6c757d',
    color: 'white'
};

export const descriptionContainerStyles = {
    marginTop: '20px'
}; 