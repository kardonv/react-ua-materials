import { render, screen, logRoles } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    test('renders Login button', () => {
        const view = render(<Application names={names} />);

        // logRoles(view.container);

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
});