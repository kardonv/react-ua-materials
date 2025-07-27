import { User } from '../types';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
    return (
        <header className="header">
            <h1>My App</h1>
            <div className="user-info">
                {user ? (
                    <>
                        <span>Welcome, {user.name}!</span>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <span>Not logged in</span>
                )}
            </div>
        </header>
    );
};