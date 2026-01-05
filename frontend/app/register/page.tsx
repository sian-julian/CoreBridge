"use client"
import { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, Zap, ArrowRight, BookOpen, GraduationCap, Eye, EyeOff } from 'lucide-react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'STUDENT'
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password.length < 8) {
            alert("Security requirement: Password must be at least 8 characters.");
            return;
        }

        setLoading(true);
        try {
            // Real API call to your Django Backend
            await api.post('/users/register/', formData);
            alert("Account created successfully! Welcome to CoreBridge.");
            router.push('/login');
        } catch (error: any) {
            console.error('Registration Error:', error.response?.data);
            alert('Registration failed. Username or email might already be taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 overflow-hidden">
            {/* Your Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 -top-48 -right-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute w-80 h-80 top-1/3 left-1/3 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Your Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            <div className="relative w-full max-w-lg">
                {/* Your Glow effect behind card */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 blur-2xl"></div>
                
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                    
                    {/* Header section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl shadow-lg shadow-purple-500/50">
                            <ShieldCheck className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                            Create Account
                        </h1>
                        <p className="text-slate-400 text-sm">Join the CoreBridge decentralized network</p>
                    </div>

                    {/* Info banner */}
                    <div className="mb-6 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
                        <p className="text-slate-300 text-xs text-center">
                            🔒 Secure blockchain-style authentication enabled
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                <input 
                                    type="text" required
                                    placeholder="choose_username"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                <input 
                                    type="email" required
                                    placeholder="name@email.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2 group">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                <input 
                                    type={showPassword ? "text" : "password"} required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Your Role Selection Logic */}
                        <div className="space-y-3 pt-2">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Select Your Role</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({...formData, role: 'STUDENT'})}
                                    className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${
                                        formData.role === 'STUDENT' 
                                        ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]' 
                                        : 'bg-slate-800/30 border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                                    }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <BookOpen className={`w-6 h-6 ${formData.role === 'STUDENT' ? 'text-blue-400' : 'text-slate-500'}`} />
                                        <span className={`text-sm font-bold ${formData.role === 'STUDENT' ? 'text-blue-300' : 'text-slate-500'}`}>Student</span>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({...formData, role: 'FACULTY'})}
                                    className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${
                                        formData.role === 'FACULTY' 
                                        ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
                                        : 'bg-slate-800/30 border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                                    }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <GraduationCap className={`w-6 h-6 ${formData.role === 'FACULTY' ? 'text-purple-400' : 'text-slate-500'}`} />
                                        <span className={`text-sm font-bold ${formData.role === 'FACULTY' ? 'text-purple-300' : 'text-slate-500'}`}>Faculty</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Your Animated Submit Button */}
                        <button 
                            type="submit"
                            disabled={loading}
                            className="relative w-full mt-6 group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative px-6 py-4 flex items-center justify-center gap-2 font-bold text-white transition-transform active:scale-95">
                                {loading ? "Initializing..." : "Register Now"}
                                {!loading && <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </div>
                        </button>
                    </form>

                    {/* Divider and Footer link */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-slate-900/50 text-slate-500">Already have an account?</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <button 
                            onClick={() => router.push('/login')} 
                            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-blue-400 transition-colors group"
                        >
                            Sign In
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}