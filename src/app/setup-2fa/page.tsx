'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { GenerateQRResponse } from '@/types/api';
import { inter, poppins } from '@/lib/font';
import Image from 'next/image';

export default function Setup2FA() {
    const [qrImage, setQrImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            router.push('/login');
            return;
        }

        const fetchQR = async () => {
            try {
                const res = await api<GenerateQRResponse>('/2fa/setup', 'POST', { userId });
                setQrImage(res.qrCode);
                setError(null);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to generate QR code. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchQR();
    }, [router]);

    if (loading) {
        return (
            <div className={`${poppins.className} min-h-screen flex items-center justify-center bg-gray-200`}>
                <div className='text-center'>
                    <div className='w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto'></div>
                    <p className='mt-4 text-lg font-medium text-gray-700'>Generating your QR code...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={`${poppins.className} min-h-screen flex items-center justify-center bg-gray-50 px-4`}>
                <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center'>
                    <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
                        <svg className='h-6 w-6 text-red-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className='mt-3 text-lg font-medium text-gray-900'>Error</h2>
                    <p className='mt-2 text-sm text-red-600'>{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className='mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                      shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${poppins.className} min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8`}>
            <div className='max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md'>
                <div className='text-center'>
                    <h2 className={`${inter.className} mt-2 text-2xl font-bold text-gray-900`}>
                        Set Up Two-Factor Authentication
                    </h2>
                    <p className='mt-2 text-sm text-gray-600'>
                        Scan the QR code below with your authenticator app like
                        Google Authenticator or Authy
                    </p>
                </div>

                <div className='mt-6 flex justify-center'>
                    {qrImage ? (
                        <div className='mt-6'>
                            <Image
                                src={qrImage}
                                alt="2FA QR Code"
                                width={192}
                                height={192}
                                className='w-48 h-48 border border-gray-200 rounded-lg p-2'
                                unoptimized
                            />
                        </div>
                    ) : (
                        <p className='text-center text-gray-500'>Loading QR Code...</p>
                    )}
                </div>

                <div className='mt-6 bg-blue-50 rounded-lg p-4'>
                    <h3 className='text-sm font-medium text-blue-800'>Next Steps</h3>
                    <p className='mt-1 text-sm text-blue-700'>
                        After scanning, enter the 6-digit code from your authenticator app to verify.
                    </p>
                </div>

                <div className="mt-6">
                    <button
                        onClick={() => router.push('/verify-2fa')}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        I&apos;ve scanned the QR code
                    </button>
                </div>
            </div>
        </div>
    );
}
