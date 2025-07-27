import { Sidebar, UserProfile, UserSettings } from './';

export function MainContent() {
    return (
        <div className="main-content">
            <Sidebar />
            <div className="content">
                <h2>Main Content Area</h2>
                <p>This component doesn't use the user data, but passes it down to children.</p>
                <UserProfile />
                <UserSettings />
            </div>
        </div>
    );
}; 