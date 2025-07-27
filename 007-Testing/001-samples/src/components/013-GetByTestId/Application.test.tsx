import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    test('renders correctly', () => {
        render(<Application />);

        /**
         * getByTestId will return the element that has the given test id
         */
        const nameElement = screen.getByTestId('name');
        expect(nameElement).toBeInTheDocument();
    });
});