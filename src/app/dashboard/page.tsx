'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { inter, poppins } from '@/lib/font';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const hasToken = document.cookie.includes('accessToken=');
        if (!hasToken) router.push('/login');
        else setLoading(false);
    })

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className={`${poppins.className} min-h-screen bg-gray-50`}>
            {/* Navigation Bar */}
            <nav className='bg-white shadow-sm'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between h-16 items-center'>
                        <h1 className='text-xl font-semibold text-gray-800'>Dashboard</h1>
                        <button onClick={() => {
                            document.cookie = 'accessToken=; Max-Age=0; path=/';
                            router.push('/login');
                        }}
                        className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600
                          transition-colors
                        '
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className={`${inter.className} text-2xl font-bold text-gray-800 mb-4`}>
                        Welcome to your Dashboard
                    </h2>
                    <p className='text-gray-600 mb-6'>
                        You&apos;re successfully logged in and ready to get started.
                    </p>

                    {/* Dashboard Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='bg-blue-50 p-4 rounded-lg border border-blue-100'>
                            <h3 className='font-medium text-blue-800'>Recent Activity</h3>
                            <p className='text-blue-600 mt-2'>No recent activity</p>
                        </div>

                        <div className='bg-blue-50 p-4 rounded-lg border border-blue-100'>
                            <h3 className='font-medium text-blue-800'>Statistics</h3>
                            <p className='text-blue-600 mt-2'>Coming soon</p>
                        </div>

                        <div className='bg-blue-50 p-4 rounded-lg border border-blue-100'>
                            <h3 className='font-medium text-blue-800'>Quick Actions</h3>
                            <p className='text-blue-600 mt-2'>Explore features</p>
                        </div>
                    </div>
                </div>
                
            </main>

        </div>
    )
}