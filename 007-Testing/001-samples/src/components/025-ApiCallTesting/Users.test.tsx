import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Users } from './Users';

// Mock data
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com' }
];

// Setup MSW server
const server = setupServer(
    rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
        return res(ctx.json(mockUsers));
    })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Users Component', () => {
    test('renders users list successfully', async () => {
        render(<Users />);

        expect(screen.getByText('Users')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
            expect(screen.getByText('Alice Brown')).toBeInTheDocument();
            expect(screen.getByText('Charlie Wilson')).toBeInTheDocument();
        });

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(5);
    });

    test('displays loading state initially', () => {
        render(<Users />);

        expect(screen.getByText('Users')).toBeInTheDocument();

        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    test('displays error message when API call fails', async () => {
        server.use(
            rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        render(<Users />);

        await waitFor(() => {
            expect(screen.getByText('Error fetching users')).toBeInTheDocument();
        });

        // Users should not be displayed when there's an error
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    test('displays error message on network error', async () => {
        // Override the default handler to simulate network error
        server.use(
            rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
                return res.networkError('Failed to connect');
            })
        );

        render(<Users />);

        // Wait for error to be displayed
        await waitFor(() => {
            expect(screen.getByText('Error fetching users')).toBeInTheDocument();
        });
    });

    test('handles empty users array', async () => {
        // Override the default handler to return empty array
        server.use(
            rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
                return res(ctx.json([]));
            })
        );

        render(<Users />);

        // Wait for component to finish loading
        await waitFor(() => {
            // No users should be displayed
            expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
        });

        // Title should still be displayed
        expect(screen.getByText('Users')).toBeInTheDocument();
    });

    test('displays users in correct order', async () => {
        render(<Users />);

        await waitFor(() => {
            const listItems = screen.getAllByRole('listitem');
            
            // Check if users are displayed in the correct order
            expect(listItems[0]).toHaveTextContent('John Doe');
            expect(listItems[1]).toHaveTextContent('Jane Smith');
            expect(listItems[2]).toHaveTextContent('Bob Johnson');
            expect(listItems[3]).toHaveTextContent('Alice Brown');
            expect(listItems[4]).toHaveTextContent('Charlie Wilson');
        });
    });

    test('handles malformed API response', async () => {
        // Override the default handler to return malformed data
        server.use(
            rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
                return res(ctx.json([
                    { id: 1, name: 'John Doe' }, // Valid user
                    { id: 2 }, // Missing name
                    { name: 'Jane Smith' }, // Missing id
                    null, // Null user
                    { id: 3, name: 'Bob Johnson' } // Valid user
                ]));
            })
        );

        render(<Users />);

        await waitFor(() => {
            // Should display valid users and handle invalid ones gracefully
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
            
            // Invalid users should not cause errors
            const listItems = screen.getAllByRole('listitem');
            expect(listItems.length).toBeGreaterThan(0);
        });
    });

    test('makes only one API call on mount', async () => {
        let callCount = 0;
        
        server.use(
            rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
                callCount++;
                return res(ctx.json(mockUsers));
            })
        );

        render(<Users />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        // Verify API was called only once
        expect(callCount).toBe(1);
    });
}); 