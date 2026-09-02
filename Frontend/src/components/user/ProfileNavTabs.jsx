import React from "react";
import { BookIcon, RepoIcon, StarIcon, GearIcon } from "@primer/octicons-react";

/**
 * ProfileNavTabs Component
 * Sticky top underline tab bar for navigating between user profile sub-views.
 */
const ProfileNavTabs = ({
    activeTab,
    setActiveTab,
    repoCount = 0,
    starredCount = 0
}) => {
    return (
        <div className="profile-top-nav-bar">
            <div className="profile-nav-inner">
                <button
                    className={`profile-tab-button ${activeTab === "overview" ? "active" : ""}`}
                    onClick={() => setActiveTab("overview")}
                >
                    <BookIcon size={16} />
                    Overview
                </button>

                <button
                    className={`profile-tab-button ${activeTab === "repositories" ? "active" : ""}`}
                    onClick={() => setActiveTab("repositories")}
                >
                    <RepoIcon size={16} />
                    Repositories
                    <span className="tab-counter-badge">{repoCount}</span>
                </button>

                <button
                    className={`profile-tab-button ${activeTab === "starred" ? "active" : ""}`}
                    onClick={() => setActiveTab("starred")}
                >
                    <StarIcon size={16} />
                    Starred
                    <span className="tab-counter-badge">{starredCount}</span>
                </button>

                <button
                    className={`profile-tab-button ${activeTab === "settings" ? "active" : ""}`}
                    onClick={() => setActiveTab("settings")}
                >
                    <GearIcon size={16} />
                    Settings
                </button>
            </div>
        </div>
    );
};

export default ProfileNavTabs;
