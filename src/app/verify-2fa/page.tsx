'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Verify2FAResponse } from '@/types/api';

export default function Verify2FA() {
    const [token, setToken] = useState('');
    const router = useRouter();

    const handleVerify = async () => {
        const userId = localStorage.getItem('userId');
        const res = await api<Verify2FAResponse>('/2fa/verify', 'POST', { userId, token });

        if (res.accessToken) {
            document.cookie = `accessToken=${res.accessToken}; path=/`;
            router.push('/dashboard');
        } else {
            alert(res.message || 'Verification failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Enter the 6-digit code</h2>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder='123456'
            />
            <button onClick={handleVerify}>Verify</button>
        </div>
    );
}