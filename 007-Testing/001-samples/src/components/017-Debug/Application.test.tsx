import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    test('renders Login button', () => {
        render(<Application names={names} />);

        const loginButton = screen.getByRole('button', {
            name: 'Login'
        });
        expect(loginButton).toBeInTheDocument();

        /**
         * queryByRole will return the element that has the given role
         *  1. returns the matching node for a query, and return null if no elements match
         *  2. Useful for testing that an element is not in the document
         *  3. Throws an error if more than one element matches the query
         */

        const welcomeElement = screen.queryByRole('heading', {
            name: `Welcome to the application`
        });
        expect(welcomeElement).not.toBeInTheDocument();
    });

    test('renders welcome message after login', async () => {
        render(<Application names={names} />);

        // screen.debug();

        /**
         * findBy
         *  1. Returns a Promise which resolves when an element is found which matches given query
         *  2 The Promise is rejected if no elements is found or if more than one element is found after default timeout of 1000ms
         */

        const welcomeElement = await screen.findByRole('heading', {
            name: `Welcome to the application`
            // name: `Welcome to the app`
        });
        expect(welcomeElement).toBeInTheDocument();

        // screen.debug();

        // Verify login button is gone
        const loginButton = screen.queryByRole('button', { name: 'Login' });
        expect(loginButton).not.toBeInTheDocument();
    });
});