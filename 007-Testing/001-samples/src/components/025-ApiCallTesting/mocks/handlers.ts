import { rest } from 'msw';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com' }
];

export const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(mockUsers)
        );
    }),

    rest.get('https://jsonplaceholder.typicode.com/users/error', (req, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json({ message: 'Internal Server Error' })
        );
    }),

    rest.get('https://jsonplaceholder.typicode.com/users/network-error', (req, res, ctx) => {
        return res.networkError('Failed to connect');
    }),

    rest.get('https://jsonplaceholder.typicode.com/users/empty', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([])
        );
    })
]; 