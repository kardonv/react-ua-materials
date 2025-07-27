import { User } from '../types';
import { Sidebar, UserProfile, UserSettings } from './';

interface MainContentProps {
    user: User | null;
    onUpdateUser: (user: User) => void;
}

export function MainContent({ user, onUpdateUser }: MainContentProps) {
    return (
        <div className="main-content">
            <Sidebar user={user} />
            <div className="content">
                <h2>Main Content Area</h2>
                <p>This component doesn't use the user data, but passes it down to children.</p>
                <UserProfile user={user} onUpdateUser={onUpdateUser} />
                <UserSettings user={user} onUpdateUser={onUpdateUser} />
            </div>
        </div>
    );
};