import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    test('renders correctly', () => {
        render(<Application />);

        /**
         * getByText will search for all elements that have text node with textContent
         */
        const paragraphElement = screen.getByText('All fields are mandatory');
        expect(paragraphElement).toBeInTheDocument();
    });
});