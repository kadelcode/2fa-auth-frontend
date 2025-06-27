import Link from 'next/link';
import { inter, poppins } from "@/lib/font"
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Homepage',
    description: '2FA Authentication System',
};

export default function LandingPage() {
  return (
    <main className={`${poppins.className} text-gray-800 min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center`}>
      <h1 className={`${inter.className} text-4xl font-bold mb-4`}>Secure Your Account with 2FA</h1>
      <p className={`${inter.className} text-lg mb-6 max-w-xl`}>
        This app uses time-based one-time passwords (TOTP) and QR codes to provide secure Two-Factor Authentication.
      </p>

      <div className="flex gap-4">
        <Link href="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl">
          Register
        </Link>
        <Link href="/login" className="border border-indigo-600 px-6 py-2 rounded-xl text-indigo-600">
          Login
        </Link>
      </div>

      <section className="mt-12 text-left max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-700">
          <li>Create an account</li>
          <li>Scan the QR code with Google Authenticator</li>
          <li>Enter the 6-digit code to verify your identity</li>
          <li>Access your secure dashboard</li>
        </ol>
      </section>

      <footer className="mt-12 text-sm text-gray-500">
        Built with Next.js, Node.js, and Google Authenticator · <a className='text-blue-600 hover:text-blue-500' href="https://github.com/kadelcode/2fa-auth-service">GitHub</a>
      </footer>
    </main>
  );
}
