'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api'

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    //const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // setError('');
        setMessage('');

        const res = await api<{ message: string }>(
            '/reset-password',
            'POST',
            { token, newPassword }
        );

        try {
            if (!token) {
                throw new Error('Invalid or missing token.');
            }

            setMessage(res.message || 'Password reset successfully. You can now log in.');
            setNewPassword('');
            setTimeout(() => {
                router.push('/login');
            }, 2000)

        } catch (err) {
            console.error(err);
            setMessage('An error occurred. Please try again.');
            return;
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className='text-2xl font-bold mb-4'>Reset Password</h1>
            <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-4'>
                <input
                  type="password"
                  required
                  placeholder='Enter new password'
                  className='w-full p-2 border rouded'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Reset Password
                </button>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
        </main>
    )
}