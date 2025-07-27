import { User } from '../types';
import { UserProfile } from './';

interface SidebarProps {
    user: User | null;
}

export function Sidebar({ user }: SidebarProps) {
    return (
        <div className="sidebar">
            <h3>Sidebar</h3>
            <p>This component doesn't use user data, but passes it down.</p>
            <UserProfile user={user} onUpdateUser={() => { }} />
        </div>
    );
};