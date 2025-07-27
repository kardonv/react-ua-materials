import { useState } from 'react';
import { useUser } from '../context/UserContext';

export function UserSettings() {
    const { user, updateUser } = useUser();
    const [notifications, setNotifications] = useState(true);
    const [theme, setTheme] = useState('light');

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        if (user) {
            updateUser({ ...user });
        }
    };

    if (!user) {
        return <div>No user logged in</div>;
    }

    return (
        <div className="user-settings">
            <h3>User Settings</h3>
            <div className="setting">
                <label>
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                    />
                    Enable Notifications
                </label>
            </div>
            <div className="setting">
                <label>
                    Theme:
                    <select value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                    </select>
                </label>
            </div>
        </div>
    );
}; 