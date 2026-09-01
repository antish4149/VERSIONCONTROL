import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import Navbar from "../../Navbar.jsx";
import { useAuth } from "../../authContext";
import { StarIcon } from "@primer/octicons-react";

// Import segregated feature modules
import ProfileSidebar from "./ProfileSidebar.jsx";
import ProfileNavTabs from "./ProfileNavTabs.jsx";
import PinnedRepos from "./PinnedRepos.jsx";
import RepoListTab from "./RepoListTab.jsx";
import ProfileSettingsTab from "./ProfileSettingsTab.jsx";
import HeatMapProfile from "./Heatmap.jsx";

const API_BASE_URL = "http://localhost:3000";

/**
 * Main Profile Container Component
 * Orchestrates data fetching, state management, and renders segregated feature sub-modules.
 */
const Profile = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [userRepos, setUserRepos] = useState([]);

    const userId = localStorage.getItem("userId");

    // Fetch User Meta & Repositories from Backend APIs
    const loadProfileData = useCallback(async () => {
        if (!userId) {
            setLoading(false);
            setError("No user authenticated. Please log in.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // GET /users/:id
            const userResponse = await axios.get(`${API_BASE_URL}/users/${userId}`);
            const userData = userResponse.data.user || userResponse.data;
            setUser(userData);

            // GET /repo/user/:userId
            try {
                const reposResponse = await axios.get(`${API_BASE_URL}/repo/user/${userId}`);
                setUserRepos(Array.isArray(reposResponse.data) ? reposResponse.data : []);
            } catch (repoErr) {
                console.warn("Could not fetch user repos:", repoErr);
                setUserRepos([]);
            }
        } catch (err) {
            console.error("Failed to load user profile: ", err);
            setError(err.response?.data?.message || "Failed to load user profile. Please check connection.");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadProfileData();
    }, [loadProfileData]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        if (typeof setCurrentUser === "function") {
            setCurrentUser(null);
        }
        navigate("/auth");
    };

    return (
        <>
            <Navbar />

            {/* Top Navigation Underline Tabs */}
            <ProfileNavTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                repoCount={userRepos.length}
                starredCount={user?.StarredRepositories?.length || 0}
            />

            {/* Main Profile Grid Layout */}
            <div className="profile-page-wrapper">
                {/* Left Sidebar Module */}
                <ProfileSidebar
                    loading={loading}
                    error={error}
                    user={user}
                    onEditProfileClick={() => setActiveTab("settings")}
                    onLogout={handleLogout}
                    onRetry={loadProfileData}
                />

                {/* Right Main Content Module Views */}
                <main className="profile-main-content">
                    {loading ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div className="skeleton-box" style={{ height: "140px", width: "100%" }} />
                            <div className="skeleton-box" style={{ height: "180px", width: "100%" }} />
                        </div>
                    ) : (
                        <>
                            {/* OVERVIEW TAB */}
                            {activeTab === "overview" && (
                                <>
                                    <PinnedRepos repositories={userRepos} />
                                    <HeatMapProfile />
                                </>
                            )}

                            {/* REPOSITORIES TAB */}
                            {activeTab === "repositories" && (
                                <RepoListTab repositories={userRepos} />
                            )}

                            {/* STARRED TAB */}
                            {activeTab === "starred" && (
                                <section>
                                    <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
                                        Starred Repositories
                                    </h2>
                                    <div className="pinned-repo-card" style={{ padding: "32px", textAlign: "center" }}>
                                        <StarIcon size={32} style={{ color: "var(--gh-text-secondary)", marginBottom: "8px" }} />
                                        <p style={{ color: "var(--gh-text-secondary)", margin: 0 }}>
                                            You haven't starred any repositories yet.
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* SETTINGS TAB */}
                            {activeTab === "settings" && (
                                <ProfileSettingsTab
                                    user={user}
                                    userId={userId}
                                    onProfileUpdated={(updatedUser) => {
                                        setUser((prev) => ({ ...prev, ...updatedUser }));
                                    }}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>
        </>
    );
};

export default Profile;
