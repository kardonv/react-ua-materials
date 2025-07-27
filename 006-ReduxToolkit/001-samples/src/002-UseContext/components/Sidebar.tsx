import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export function Sidebar() {
    const userContext = useContext(UserContext);

    return (
        <div className="sidebar">
            <h3>Sidebar</h3>
            <p>This component doesn't use user data, but passes it down.</p>
            
            {userContext?.user && (
                <div className="user-profile">
                    <h3>User Profile</h3>
                    <div className="user-info">
                        <p><strong>Name:</strong> {userContext.user.name}</p>
                        <p><strong>Email:</strong> {userContext.user.email}</p>
                        <p><strong>Role:</strong> {userContext.user.role}</p>
                        <button>View Profile</button>
                    </div>
                </div>
            )}
        </div>
    );
}; 