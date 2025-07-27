import { render, screen, logRoles, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';


describe('Counter', () => {
    test('renders count of 10 after clicking the set button', () => {
        render(<Counter />);

        const amountInput = screen.getByRole('spinbutton');

        userEvent.type(amountInput, '10');

        expect(amountInput).toHaveValue(10);

        const setButton = screen.getByRole('button', {
            name: 'Set'
        });

        userEvent.click(setButton);

        const counterElement = screen.getByRole('heading');
        expect(counterElement).toHaveTextContent('10');
    });
});