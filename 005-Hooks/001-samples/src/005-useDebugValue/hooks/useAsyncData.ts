import { useDebugValue, useEffect, useState } from "react";

export function useAsyncData(url: string) {
    const [data, setData] = useState<{ message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Simulate API call
        const timeout = setTimeout(() => {
            if (Math.random() > 0.2) {
                setData({ message: `Data from ${url}` });
                setLoading(false);
            } else {
                setError('Failed to fetch data');
                setLoading(false);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [url]);

    // Lazy debug value - only computed when DevTools are open
    useDebugValue(
        { data, loading, error },
        ({ data, loading, error }) => {
            if (loading) return '⏳ Loading...';
            if (error) return `❌ Error: ${error}`;
            if (data) return '✅ Data loaded';
            return '📭 No data';
        }
    );

    return { data, loading, error };
}
