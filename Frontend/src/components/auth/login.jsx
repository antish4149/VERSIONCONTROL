import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { PageHeader } from "@primer/react/experimental";
import { Button } from "@primer/react";
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
                <img className="logo-login" src={logo} alt="Logo" />
            </div>

            <div className="login-box-wrapper">
                <div className="login-heading">
                    <div style={{ padding: "8px" }}>
                        <PageHeader>
                            <PageHeader.TitleArea variant="large">
                                <PageHeader.Title>Sign In</PageHeader.Title>
                            </PageHeader.TitleArea>
                        </PageHeader>
                    </div>
                </div>

                <div className="login-box">
                    {errorMsg && (
                        <div className="error-msg" style={{ color: "#f85149", marginBottom: "12px", fontSize: "14px", textAlign: "center" }}>
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div>
                            <label className="label" htmlFor="Email">Email address</label>
                            <input
                                autoComplete="off"
                                name="Email"
                                id="Email"
                                className="input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="div">
                            <label className="label" htmlFor="Password">Password</label>
                            <input
                                autoComplete="off"
                                name="Password"
                                id="Password"
                                className="input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button
                            variant="primary"
                            className="login-btn"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "Loading..." : "Login"}
                        </Button>
                    </form>
                </div>

                <div className="pass-box">
                    <p>
                        New user? <Link to="/signup">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;