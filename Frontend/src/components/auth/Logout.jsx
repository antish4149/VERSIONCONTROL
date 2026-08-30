import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";

export const useLogout = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3000/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            setCurrentUser(null);
            navigate("/auth");
        }
    };

    return handleLogout;
};

const Logout = () => {
    const logout = useLogout();

    useEffect(() => {
        logout();
    }, []);

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;