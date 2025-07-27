import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    test('renders correctly', () => {
        render(<Application />);

        /**
         * getByDisplayValue returns the input, textarea, or select element that has the same value as the string passed to it
         */
        const nameElement = screen.getByDisplayValue('Fullname');
        expect(nameElement).toBeInTheDocument();
    });
});