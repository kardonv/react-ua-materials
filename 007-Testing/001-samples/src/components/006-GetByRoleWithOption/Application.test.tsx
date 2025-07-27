import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    test('renders correctly', () => {
        render(<Application />);

        const pageHeading = screen.getByRole('heading', {
            level: 1,                                       // Allows us to specify the level of the heading
            name: 'Job Application Form',                   // Comment this out to see the test fail
        });
        expect(pageHeading).toBeInTheDocument();

        const sectionHeading = screen.getByRole('heading', {
            level: 2,                                       // Allows us to specify the level of the heading
            name: 'Section 1',                              // Comment this out to see the test fail
        });
        expect(sectionHeading).toBeInTheDocument();
    });
});