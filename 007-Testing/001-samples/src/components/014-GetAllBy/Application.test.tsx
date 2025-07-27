import { render, screen } from '@testing-library/react';
import { Application } from './Application';


describe('Application', () => {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    test('renders correctly', () => {
        render(<Application names={names} />);

        const listElement = screen.getByRole('list');
        expect(listElement).toBeInTheDocument();

        /**
         * getAllByRole will return all elements that have the given role
         */
        const listItemsElements = screen.getAllByRole('listitem');
        expect(listItemsElements).toHaveLength(names.length);
    });
});