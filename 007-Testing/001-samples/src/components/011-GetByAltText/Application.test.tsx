import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    test('renders correctly', () => {
        render(<Application />);

        /**
         * getByAltText will return the element that has the given text
         * 
         * This method is useful for testing images, icons, input, area, etc. that have alt text
         */
        const imageElement = screen.getByAltText('a person with a laptop');
        expect(imageElement).toBeInTheDocument();
    });
});