import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCurrentUser } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/register", {
                email: email,
                password: password,
                username: username,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);

            setCurrentUser(res.data.userId);
            setLoading(false);

            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("Signup Failed!");
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
                <h1 className="auth-title">Sign up for GitHub</h1>

                <div className="login-box">
                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label className="label" htmlFor="Username">Username</label>
                            <input
                                autoComplete="off"
                                name="Username"
                                id="Username"
                                className="input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="label" htmlFor="Email">Email address</label>
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
                            <label className="label" htmlFor="Password">Password</label>
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
                            type="submit"
                            className="auth-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </form>
                </div>

                <div className="pass-box">
                    <p>
                        Already have an account? <Link to="/auth">Sign in</Link>.
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

export default Signup;
