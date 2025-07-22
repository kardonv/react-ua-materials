import { useDebugValue, useEffect, useState } from "react";

export function useUserStatus(userId: number) {
    const [status, setStatus] = useState<'online' | 'offline' | 'away'>('offline');
    const [lastSeen, setLastSeen] = useState<Date>(new Date());

    // useDebugValue provides custom label in React DevTools
    useDebugValue(
        status === 'online'
            ? '🟢 Online'
            : status === 'away'
                ? '🟡 Away'
                : '🔴 Offline'
    );

    useEffect(() => {
        // Simulate user status changes
        const interval = setInterval(() => {
            const random = Math.random();
            if (random < 0.4) {
                setStatus('online');
                setLastSeen(new Date());
            } else if (random < 0.7) {
                setStatus('away');
                setLastSeen(new Date());
            } else {
                setStatus('offline');
                setLastSeen(new Date());
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return { status, lastSeen };
}