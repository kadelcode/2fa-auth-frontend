import type { Metadata } from "next";
import RegisterClientComponent from "@/components/RegisterClientComponent";

export const metadata: Metadata = {
    title: 'Register',
    description: 'Sign up',
};

export default function LoginPage() {
    return <RegisterClientComponent />;
}