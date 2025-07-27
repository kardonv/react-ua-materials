import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
    user: User | null;
    updateUser: (user: User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
console.log('UserContext created', UserContext);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin'
    });

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    const logout = () => {
        setUser(null);
    };

    const value: UserContextType = {
        user,
        updateUser,
        logout
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} 