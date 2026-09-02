import React from "react";
import { PeopleIcon, MailIcon, SignOutIcon, AlertIcon } from "@primer/octicons-react";

/**
 * ProfileSidebar Component
 * Handles user avatar, bio, follower metrics, metadata, and authentication logout trigger.
 */
const ProfileSidebar = ({
    loading,
    error,
    user,
    onEditProfileClick,
    onLogout,
    onRetry
}) => {
    if (loading) {
        return (
            <aside className="user-profile-sidebar">
                <div className="profile-avatar-wrapper skeleton-box" />
                <div className="skeleton-box" style={{ height: "28px", width: "70%" }} />
                <div className="skeleton-box" style={{ height: "20px", width: "50%" }} />
                <div className="skeleton-box" style={{ height: "36px", width: "100%" }} />
            </aside>
        );
    }

    if (error) {
        return (
            <aside className="user-profile-sidebar">
                <div className="error-fallback-card">
                    <AlertIcon size={32} />
                    <span className="error-fallback-title">Profile Error</span>
                    <p style={{ fontSize: "12px", color: "var(--gh-text-secondary)" }}>{error}</p>
                    <button className="btn-retry" onClick={onRetry}>
                        Retry Fetching
                    </button>
                </div>
            </aside>
        );
    }

    const userInitial = user?.username ? user.username.substring(0, 2).toUpperCase() : "U";

    return (
        <aside className="user-profile-sidebar">
            {/* Avatar */}
            <div className="profile-avatar-wrapper">
                <div className="avatar-placeholder">{userInitial}</div>
            </div>

            {/* Display Name & Handle */}
            <div className="user-names-container">
                <h1 className="user-display-name">{user?.username || "GitHub User"}</h1>
                <div className="user-username-handle">@{user?.username?.toLowerCase()}</div>
            </div>

            {/* User Bio */}
            <p className="user-bio-text">
                Full-stack developer building modern web applications & open-source projects.
            </p>

            {/* Edit Profile Button */}
            <button className="btn-edit-profile" onClick={onEditProfileClick}>
                Edit profile
            </button>

            {/* Followers & Following Stats */}
            <div className="follower-stats-row">
                <a href="#followers" className="follower-stat-item">
                    <PeopleIcon size={16} />
                    <strong>{user?.FollowedUsers?.length || 0}</strong> followers
                </a>
                ·
                <a href="#following" className="follower-stat-item">
                    <strong>{user?.FollowedUsers?.length || 0}</strong> following
                </a>
            </div>

            {/* Meta Links */}
            <div className="sidebar-meta-list">
                {user?.email && (
                    <div className="sidebar-meta-item">
                        <MailIcon size={16} />
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                    </div>
                )}
            </div>

            {/* Logout Trigger */}
            <button className="btn-logout-sidebar" onClick={onLogout} id="logout">
                <SignOutIcon size={16} style={{ marginRight: "6px" }} />
                Sign Out
            </button>
        </aside>
    );
};

export default ProfileSidebar;
