import { useEffect, useState } from 'react';

interface ApplicationProps {
    names: string[];
}

export function Application({ names }: ApplicationProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoggedIn(true);
        }, 800);
    }, []);

    return (
        <div>
            <ul>
                {names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>

            {isLoggedIn ? (
                <h2>Welcome to the application</h2>
            ) : (
                <>
                    <h2>Please login</h2>
                    <button onClick={() => setIsLoggedIn(true)}>Login</button>
                </>
            )}
        </div>
    );
}