import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    test('renders correctly', () => {
        render(<Application />);

        /**
         * Name can be:
         *  1. the label of the element
         *  2. the text content of a button
         *  3. the value of the `area-label` attribute
         */
        const formElement = screen.getByRole('textbox', {
            name: 'Name'
        });
        expect(formElement).toBeInTheDocument();

        const bioElement = screen.getByRole('textbox', {
            name: 'Bio'
        });
        expect(bioElement).toBeInTheDocument();

        const jobLocationElement = screen.getByRole('combobox');
        expect(jobLocationElement).toBeInTheDocument();

        const termsElement = screen.getByRole('checkbox');
        expect(termsElement).toBeInTheDocument();

        const submitButtonElement = screen.getByRole('button');
        expect(submitButtonElement).toBeInTheDocument();
    });
});