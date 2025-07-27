import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    test('renders correctly', () => {
        render(<Application />);

        /**
         * getByPlaceholderText is used to find an input by its placeholder text
         */
        const nameElement = screen.getByPlaceholderText('Fullname');
        expect(nameElement).toBeInTheDocument();
    });
});