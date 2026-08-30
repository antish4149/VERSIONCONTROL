import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!email || !password) {
            setErrorMsg("Please enter email and password.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/login", {
                email,
                password,
            });

            if (res.data.token && res.data.userId) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);
                setCurrentUser(res.data.userId);
                setLoading(false);
                navigate("/");
            } else {
                setErrorMsg("Invalid credentials.");
                setLoading(false);
            }
        } catch (err) {
            console.error("Login error:", err);
            const msg = err.response?.data?.message || "Login Failed! Please check your credentials.";
            setErrorMsg(msg);
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-logo-container">
                <Link to="/">
                    <img className="logo-login" src={logo} alt="GitHub Logo" />
                </Link>
            </div>

            <div className="login-box-wrapper">
                <h1 className="auth-title">Sign in to GitHub</h1>

                <div className="login-box">
                    {errorMsg && (
                        <div className="error-banner">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label className="label" htmlFor="Email">Username or email address</label>
                            <input
                                autoComplete="off"
                                name="Email"
                                id="Email"
                                className="input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="label-container">
                                <label className="label" htmlFor="Password">Password</label>
                                <a href="#forgot" className="forgot-link">Forgot password?</a>
                            </div>
                            <input
                                autoComplete="off"
                                name="Password"
                                id="Password"
                                className="input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            className="auth-btn"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </div>

                <div className="pass-box">
                    <p>
                        New to GitHub? <Link to="/signup">Create an account</Link>.
                    </p>
                </div>

                <footer className="auth-footer">
                    <a href="#">Terms</a>
                    <a href="#">Privacy</a>
                    <a href="#">Docs</a>
                    <a href="#">Contact GitHub Support</a>
                </footer>
            </div>
        </div>
    );
};

export default Login;