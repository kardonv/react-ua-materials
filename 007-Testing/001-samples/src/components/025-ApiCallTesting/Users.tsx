import React, { useState, useEffect } from 'react';

export const Users = () => {
    const [users, setUsers] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                // Filter out invalid users and extract names safely
                const validUsers = data
                    .filter((user: any) => user && typeof user === 'object' && user.name)
                    .map((user: { name: string }) => user.name);
                setUsers(validUsers);
            })
            .catch(() => setError("Error fetching users"));
    }, []);

    return (
        <div>
            <h1>Users</h1>
            {error && <p>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </div>
    );
}; 