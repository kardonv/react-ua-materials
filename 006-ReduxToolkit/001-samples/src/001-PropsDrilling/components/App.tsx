import { useState } from 'react';
import { User } from '../types';
import { Header, MainContent } from './';

interface AppProps { }

export function App() {
    const [user, setUser] = useState<User | null>({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin'
    });

    const handleLogout = () => {
        setUser(null);
    };

    const handleUpdateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    return (
        <div className="app">
            <Header user={user} onLogout={handleLogout} />
            <MainContent user={user} onUpdateUser={handleUpdateUser} />
        </div>
    );
};