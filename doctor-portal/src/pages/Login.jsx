import { useState, useContext } from "react";
import { Context } from "../Context/Context.jsx";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { RiStethoscopeLine } from "react-icons/ri";

const Login = () => {
    const { isAuthenticated, setIsAuthenticated, setDoctor } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    if (isAuthenticated) return <Navigate to="/" />;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/user/login", {
                email, password, confirmPassword, role: "Doctor"
            }, { withCredentials: true });
            toast.success(res.data.message);
            setIsAuthenticated(true);
            setDoctor(res.data.data.user);
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-teal-100 p-4 rounded-full mb-3">
                        <RiStethoscopeLine className="text-4xl text-teal-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Doctor Portal</h1>
                    <p className="text-gray-500 text-sm">Sign in to your account</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
                    <button type="submit"
                        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
