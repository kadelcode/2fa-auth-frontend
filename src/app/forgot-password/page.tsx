'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

import { inter, poppins } from '@/lib/font';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const res = await api<{ message: string }>(
                '/forgot-password',
                'POST',
                { email }
            )

            
            setMessage(res.message || 'Check your inbox for a reset link.');
            setEmail('');
            //router.push('/login');
            
        } catch (err) {
          console.error(err);
          setError('An error occurred. Please try again.');
        } finally {
          setLoading(false);
        }
    }

    return (
        <main className={`${poppins.className} min-h-screen bg-gray-50 flex flex-col items-center justify-center
          py-12 sm:px-6 lg:px-8`}
        >
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
                    <h2 className={`${inter.className} mt-6 text-center text-3xl font-extrabold text-gray-900`}>
                        Forgot Password
                    </h2>

                    {/* Error message display (only shows when error exists) */}
                    {error && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {message && <p className="text-green-500">{message}</p>}
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md 
                            shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            transition p-3
                            "
                            required
                            placeholder='you@example.com'
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`flex justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm 
                                text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 
                                focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                                ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Send Reset Link'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}