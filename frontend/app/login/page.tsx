"use client"
import { useState } from 'react';
import { Eye, EyeOff, Lock, User, Zap } from 'lucide-react';
import api from '@/lib/axios'; // Ensure this path is correct
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // 1. Send the data to your Django Backend
            const response = await api.post('/auth/login/', formData);
            
            // 2. Store the JWT tokens in the browser
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            
            // 3. Move to the Dashboard
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Login Error:', error.response?.data);
            alert('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* Main card */}
            <div className="relative w-full max-w-md">
                {/* Glow effect behind card */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 blur-2xl"></div>
                
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                    {/* Logo section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/50">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                            CoreBridge
                        </h1>
                        <p className="text-slate-400 text-sm">Decentralized Learning Management</p>
                    </div>

                    {/* Welcome message */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
                        <p className="text-slate-300 text-sm text-center">
                            Welcome back! Please enter your credentials to continue.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username field */}
                        <div className="relative group">
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Enter your username"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="relative group">
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot password link */}
                        <div className="flex justify-end">
                            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit button */}
                        <button 
                            type="submit"
                            disabled={loading}
                            className="relative w-full group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative px-6 py-4 flex items-center justify-center gap-2 font-bold text-white">
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-slate-900/50 text-slate-500 uppercase tracking-widest">New to CoreBridge?</span>
                        </div>
                    </div>

                    {/* Register link */}
                    <div className="text-center">
                        <a 
                            href="/register" 
                            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-blue-400 transition-colors group"
                        >
                            Create an account
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative mt-8 text-center text-slate-500 text-xs">
                <p>Powered by blockchain technology • Secure • Decentralized</p>
            </div>
        </div>
    );
}