import { UserContext } from '../context/UserContext';

export function Header() {
    // const { user, logout } = useUser();

    return (
        <header className="header">
            <h1>My App</h1>
            <div className="user-info">
                <UserContext.Consumer>
                    {(value) => (
                        <>
                            {value?.user ? (
                                <>
                                    <span>Welcome, {value.user.name}!</span>
                                    <button onClick={value.logout}>Logout</button>
                                </>
                            ) : (
                                <span>Not logged in</span>
                            )}
                        </>
                    )}
                </UserContext.Consumer>
                {/* {user ? (
                    <>
                        <span>Welcome, {user.name}!</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <span>Not logged in</span>
                )} */}
            </div>
        </header>
    );
}; 