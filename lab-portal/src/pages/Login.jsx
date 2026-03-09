import { useContext, useState } from "react";
import { Context } from "../Context/Context.jsx";
import { Navigate } from "react-router-dom";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { RiFlaskLine } from "react-icons/ri";

const Login = () => {
    const { isAuthenticated, setIsAuthenticated, setLabTech } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    if (isAuthenticated) return <Navigate to="/" />;

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("/user/login", {
                email,
                password,
                confirmPassword: password,
                role: "LabTechnician",
            }, { withCredentials: true });
            toast.success(data.message || "Login successful");
            setIsAuthenticated(true);
            setLabTech(data.user);
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-emerald-100 p-4 rounded-full mb-4">
                        <RiFlaskLine className="text-4xl text-emerald-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Lab Portal</h1>
                    <p className="text-gray-500 text-sm">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                            placeholder="you@example.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                            placeholder="••••••••" />
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 font-medium">
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
