import type { Metadata } from "next";
import LoginClientComponent from "@/components/LoginClientComponent";

export const metadata: Metadata = {
    title: 'Login',
    description: 'Sign in to your account',
};

export default function LoginPage() {
    return <LoginClientComponent />;
}