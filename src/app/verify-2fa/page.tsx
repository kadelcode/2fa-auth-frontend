'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Verify2FAResponse } from '@/types/api';
import { Loader2 } from 'lucide-react';
import { inter, poppins } from '@/lib/font';

export default function Verify2FA() {
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleVerify = async () => {
        setError('');
        setIsLoading(true);

        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User session not found');
            }

            const res = await api<Verify2FAResponse>('/2fa/verify', 'POST', { userId, token });
            
            if (res.token) {
                document.cookie = `accessToken=${res.token}; path=/`;
                router.push('/dashboard');
            } else {
                throw new Error(res.message || 'Verification failed. Please try again.');
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (token.length === 6) {
            handleVerify();
        }
    }

    return (
        <div className={`${poppins.className} min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8`}>
            <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md'>
                <div className='text-center'>
                    <h2 className={`${inter.className} mt-6 text-3xl font-extrabold text-gray-900`}>
                        Two-Factor Authentication
                    </h2>
                    <p className='mt-2 text-sm text-gray-600'>
                        Please enter the 6-digit code from your authenticator app
                    </p>
                </div>

                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    {error && (
                        <div className='rounded-md bg-red-50 p-4'>
                            <div className='flex'>
                                <div className='ml-3'>
                                    <h3 className='text-sm font-medium text-red-800'>{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='rounded-md shadow-sm -space-y-px'>
                        <div>
                            <label htmlFor='token' className='sr-only'>
                                6-digit code
                            </label>
                            <input
                              id='token'
                              name='token'
                              type='text'
                              required
                              maxLength={6}
                              pattern="\d{6}"
                              value={token}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setToken(value);
                              }}
                              className='
                                appearance-none relative block w-full px-3 py-3 border
                                border-gray-300 placeholder-gray-500 text-gray-900
                                rounded-md focus:outline-none focus:ring-blue-500
                                focus:border-blue-500 focus:z-10 sm:text-sm text-center
                                text-xl tracking-widest
                              '
                              placeholder='- - - - - -'
                              autoComplete="one-time-code"
                              autoFocus
                            />
                        </div>
                    </div>

                    <div>
                        <button
                          type='submit'
                          disabled={token.length !== 6 || isLoading}
                          className={`group relative w-full flex justify-center py-2 px-4
                            border border-transparent text-sm font-medium rounded-md text-white
                            ${token.length === 6 && !isLoading
                                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue' :
                                'bg-blue-300 cursor-not-allowed'
                            }
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            `}
                            >
                                {isLoading ? (
                                    <><Loader2 className='w-5 h-5 mr-2 animate-spin' />Verifying...</>
                                ) : (
                                    'Verify'
                                )}
                            </button>
                    </div>
                </form>
            </div>
        </div>
    );
}