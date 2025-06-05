'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { inter, poppins } from '@/lib/font'

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ text: '', type: '' });


        try {
            if (!token) {
                throw new Error('Invalid or missing token.');
            }

            if (newPassword !== confirmPassword) {
                throw new Error('Passwords do not match.');
            }

            if (newPassword.length < 8) {
                throw new Error('Password must be at least 8 characters long.');
            }

            const res = await api<{ message: string }>(
                '/reset-password',
                'POST',
                { token, newPassword }
            );

            setMessage({
                text: res.message || 'Password reset successfully. Redirecting to login...',
                type: 'success'
            });

            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                router.push('/login');
            }, 2000)

        } catch (err) {
            setMessage({
                text: err instanceof Error ? err.message : 'An error occurred. Please try again.',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={`${poppins.className} flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4`}>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-6">
                    <h1 className={`${inter.className} text-2xl font-bold text-gray-800`}>Reset Password</h1>
                    <p className="text-gray-800 mt-2">Enter your new password below</p>
                </div>

                {message.text && (
                    <div className={`mt-2 mb-2 p-3 rounded-md ${message.type === 'success' ?
                        'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor="newPassword" className='block text-sm font-medium text-gray-700 mb-1'>
                            New Password
                        </label>

                        <input
                          id="newPassword"
                          type="password"
                          required
                          minLength={8}
                          placeholder='Enter new password'
                          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2
                          focus:ring-blue-500 focus:border-blue-500 transition text-gray-700'
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-700 mb-1'>
                            Confirm Password
                        </label>

                        <input
                          id="confirmPassword"
                          type="password"
                          required
                          minLength={8}
                          placeholder='Confirm new password'
                          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2
                          focus:ring-blue-500 focus:border-blue-500 transition text-gray-700'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className={`w-full py-2 px-4 rounded-md text-white font-medium
                      transition ${isLoading ? 'bg-indigo-400 cursor-not-allowed' :
                        'bg-indigo-600 hover:bg-indigo-500'
                      }`}>
                        {isLoading ? (
                            <span>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : 'Reset Password'}
                    </button>
                </form>
            </div>
        </main>
    )
}