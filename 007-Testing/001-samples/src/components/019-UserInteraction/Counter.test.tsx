import { render, screen, logRoles, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';


describe('Counter', () => {
    test('renders correctly', () => {
        render(<Counter />);

        const counterElement = screen.getByRole('heading');
        expect(counterElement).toBeInTheDocument();

        const incrementButton = screen.getByRole('button', {
            name: 'Increment'
        });
        expect(incrementButton).toBeInTheDocument();

        /**
         * Initial state of the counter should be 0
         */

    });

    test('renders a count of 0', () => {
        render(<Counter />);

        const counterElement = screen.getByRole('heading');
        expect(counterElement).toHaveTextContent('0');
    });

    test('renders a count of 1 after clicking the increment button', () => {
        render(<Counter />);

        const incrementButton = screen.getByRole('button', {
            name: 'Increment'
        });
        userEvent.click(incrementButton);

        const counterElement = screen.getByRole('heading');
        expect(counterElement).toHaveTextContent('1');
    });
});