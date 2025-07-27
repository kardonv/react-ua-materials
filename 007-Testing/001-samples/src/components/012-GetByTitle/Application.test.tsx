import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    test('renders correctly', () => {
        render(<Application />);

        /**
         * getByTitle will return the element that has the given text
         * 
         * This method is also useful for testing elements that have a title attribute
         */
        const closeElement = screen.getByTitle('close');
        expect(closeElement).toBeInTheDocument();
    });
});