'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { GenerateQRResponse } from '@/types/api';

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
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div>
                <h2>Error</h2>
                <p style={{ color: 'red' }}>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Scan this QR Code with your Authenticator app</h2>
            {qrImage ? <img src={qrImage} alt="2FA QR Code" /> : <p>Loading QR Code...</p>}
            <p>Then enter the 6-digit code to verify.</p>
        </div>
    );
}
