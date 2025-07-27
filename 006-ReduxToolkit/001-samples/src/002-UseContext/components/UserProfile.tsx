import { useState } from 'react';
import { useUser } from '../context/UserContext';

export function UserProfile() {
    const { user, updateUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleSave = () => {
        if (editedUser) {
            updateUser(editedUser);
            setIsEditing(false);
        }
    };

    if (!user) {
        return <div>No user logged in</div>;
    }

    return (
        <div className="user-profile">
            <h3>User Profile</h3>
            {isEditing ? (
                <div className="edit-form">
                    <input
                        type="text"
                        value={editedUser?.name || ''}
                        onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={editedUser?.email || ''}
                        onChange={(e) => setEditedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                        placeholder="Email"
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="user-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}; 