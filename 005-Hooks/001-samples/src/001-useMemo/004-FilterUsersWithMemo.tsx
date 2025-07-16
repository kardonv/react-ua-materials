import React, { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

async function fetchUsers(): Promise<{ id: number; name: string }[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
}

export default function FilterUsersWithMemo() {
    const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
    const [search, setSearch] = useState('');

    // Fetch once on mount
    useEffect(() => {
        console.log('Fetching users...');
        fetchUsers().then(setUsers);
    }, []);

    // Memoize the filtered result
    const filteredUsers = useMemo(() => {
        console.log('Filtering users...');
        return users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, users]);

    return (
        <div className={styles.filterContainer}>
            <h2>Filter Users</h2>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name"
                className={styles.filterInput}
            />
            <ul className={styles.filterList}>
                {filteredUsers.map(user => (
                    <li key={user.id} className={styles.filterListItem}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
