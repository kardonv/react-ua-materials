import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    test('renders correctly', () => {
        render(<Application />);

        const nameElement = screen.getByLabelText('Name');
        expect(nameElement).toBeInTheDocument();

        const checkboxElement = screen.getByLabelText('I agree to the terms and conditions');
        expect(checkboxElement).toBeInTheDocument();
    });
});