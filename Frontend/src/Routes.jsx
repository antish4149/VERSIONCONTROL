import React, { useEffect } from "react";
import { useNavigate, useRoutes, useLocation } from "react-router-dom";

import Login from "./components/auth/login.jsx";
import Signup from "./components/auth/singnUp.jsx";
import Logout from "./components/auth/Logout.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Profile from "./components/user/Profile.jsx";

import { useAuth } from "./authContext";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        if (!userIdFromStorage && !["/auth", "/signup"].includes(location.pathname)) {
            navigate("/auth");
        }

        if (userIdFromStorage && (location.pathname === '/auth' || location.pathname === '/signup')) {
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser, location.pathname]);

    let element = useRoutes([
        {
            path: "/",
            element: <Dashboard />
        },
        {
            path: "/auth",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/logout",
            element: <Logout />
        }
    ]);

    return element;
}

export default ProjectRoutes;
