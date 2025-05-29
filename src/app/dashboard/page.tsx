'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const hasToken = document.cookie.includes('accessToken=');
        if (!hasToken) router.push('/login');
        else setLoading(false);
    })

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <button onClick={() => {
                document.cookie = 'accessToken=; Max-Age=0; path=/';
                router.push('/login');
            }}>Logout</button>
        </div>
    )
}