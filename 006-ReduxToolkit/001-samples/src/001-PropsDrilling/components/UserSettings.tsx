import { useState } from 'react';
import { User } from '../types';

interface UserSettingsProps {
    user: User | null;
    onUpdateUser: (user: User) => void;
}

export function UserSettings({ user, onUpdateUser }: UserSettingsProps) {
    const [settings, setSettings] = useState({
        notifications: true,
        theme: 'light'
    });

    const handleSettingChange = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
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
                        checked={settings.notifications}
                        onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    />
                    Enable Notifications
                </label>
            </div>
            <div className="setting">
                <label>
                    Theme:
                    <select
                        value={settings.theme}
                        onChange={(e) => handleSettingChange('theme', e.target.value)}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
        </div>
    );
};