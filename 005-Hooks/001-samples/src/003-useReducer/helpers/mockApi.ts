import { Post, User } from "../types/AsyncReducer";

export const mockApi = {
    async fetchUsers(): Promise<User[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate random error (10% chance)
        if (Math.random() < 0.1) {
            throw new Error('Failed to fetch users');
        }

        return [
            { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', username: 'bobjohnson' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', username: 'alicebrown' },
            { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', username: 'charliewilson' }
        ];
    },

    async fetchPosts(): Promise<Post[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate random error (15% chance)
        if (Math.random() < 0.15) {
            throw new Error('Failed to fetch posts');
        }

        return [
            { id: 1, title: 'Getting Started with React', body: 'React is a powerful library for building user interfaces...', userId: 1 },
            { id: 2, title: 'Understanding Hooks', body: 'Hooks are a new addition in React 16.8...', userId: 2 },
            { id: 3, title: 'State Management with Redux', body: 'Redux is a predictable state container...', userId: 1 },
            { id: 4, title: 'TypeScript Best Practices', body: 'TypeScript adds static typing to JavaScript...', userId: 3 },
            { id: 5, title: 'Modern JavaScript Features', body: 'ES6+ brings many new features to JavaScript...', userId: 2 },
            { id: 6, title: 'CSS Grid Layout', body: 'CSS Grid is a powerful layout system...', userId: 4 },
            { id: 7, title: 'Web Performance Optimization', body: 'Performance is crucial for user experience...', userId: 5 },
            { id: 8, title: 'Testing React Components', body: 'Testing is essential for maintaining code quality...', userId: 3 }
        ];
    }
};