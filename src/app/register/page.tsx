"use client"

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    role: "user", // Default role for new registrations
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Registration failed");
                setIsLoading(false);
                return;
            }

            setSuccess("Registration successful! Logging you in...");
            
            // Auto-login after registration
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.ok) {
                // Fetch session to confirm login
                const sessionResponse = await fetch("/api/auth/session");
                const session = await sessionResponse.json();
                
                if (session?.user?.role === "admin") {
                    router.push("/admins");
                } else {
                    router.push("/candidates");
                }
                router.refresh();
            } else {
                // If auto-login fails, redirect to login page
                setError("Registration successful! Please login.");
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 w-full">
        <div className="max-w-md w-[90%]">
            <div className="w-full py-8">
                <img src="/logo-txt.png" className="w-32" />
            </div>
            <div className="bg-white shadow-sm rounded-md border border-gray-100 p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    Bergabung dengan Rakamin
                </h2>
            <p className="text-sm text-gray-500 mb-6">
                Sudah punya akun?{" "}
                <a href="/" className="text-primary-main font-medium hover:underline">
                    Masuk
                </a>
            </p>

            {error && (
                <div className="mb-4 p-3 bg-danger-surface border border-danger-border text-danger-main rounded-md text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-success-surface border border-success-border text-success-main rounded-md text-sm">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Alamat email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="email@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary-border text-black"/>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Kata sandi
                  </label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary-border text-black"/>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-secondary-main hover:bg-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold py-2 rounded-md transition-colors hover:cursor-pointer">
                    {isLoading ? "Mendaftar..." : "Daftar"}
                </button>
            </form>

            <div className="flex items-center my-4">
                <div className="grow border-t border-gray-300"></div>
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <div className="grow border-t border-gray-300"></div>
            </div>

            <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-md flex items-center justify-center space-x-2 transition-colors hover:cursor-pointer">
                <FcGoogle size={20} />
                <span className="text-sm font-bold">Masuk dengan Google</span>
            </button>
            </div>
        </div>
    </div>
    )
}