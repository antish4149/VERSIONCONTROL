import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";
import "./Navbar.css";

const Navbar = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    
    // State for interactive dropdown menus
    const [isPlusOpen, setIsPlusOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Refs for handling click outside
    const plusRef = useRef(null);
    const profileRef = useRef(null);
    const notifRef = useRef(null);
    const searchInputRef = useRef(null);

    // Keyboard shortcut handler ('/' key to focus search bar)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "/" &&
                document.activeElement.tagName !== "INPUT" &&
                document.activeElement.tagName !== "TEXTAREA"
            ) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (plusRef.current && !plusRef.current.contains(event.target)) {
                setIsPlusOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const userDisplayName = currentUser || "Developer";
    const userInitial = userDisplayName.charAt(0).toUpperCase();

    return (
        <header className="gh-header">
            <div className="gh-header-container">
                {/* Left Brand & Navigation Section */}
                <div className="gh-header-left">
                    {/* Mobile Hamburger Toggle */}
                    <button
                        className="gh-mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                            <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75Zm0 5a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75Z" />
                        </svg>
                    </button>

                    {/* GitHub Logo */}
                    <Link to="/" className="gh-brand-logo" title="GitHub Dashboard">
                        <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" fill="currentColor">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                        </svg>
                    </Link>

                    {/* Dashboard Badge */}
                    <Link to="/" className="gh-brand-title">
                        <span>Dashboard</span>
                    </Link>

                    {/* Global Search Bar */}
                    <div className="gh-search-container">
                        <div className="gh-search-input-wrapper">
                            <svg className="gh-search-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M10.68 11.74a6 6 0 1 1 1.06-1.06l3.04 3.04a.75.75 0 1 1-1.06 1.06l-3.04-3.04ZM11.5 7a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z" />
                            </svg>
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="gh-search-input"
                                placeholder="Type '/' to search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <kbd className="gh-search-shortcut">/</kbd>
                        </div>
                    </div>

                    {/* Header Main Nav Links */}
                    <nav className={`gh-nav-links ${isMobileMenuOpen ? "is-open" : ""}`}>
                        <Link
                            to="/"
                            className={`gh-nav-item ${location.pathname === "/" ? "active" : ""}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25H4v-13Zm3.75 0v13h1.75v-13Zm3.25 0v13h5.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Z" />
                            </svg>
                            <span>Pull requests</span>
                        </Link>
                        <Link
                            to="/"
                            className={`gh-nav-item ${location.pathname === "/issues" ? "active" : ""}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                            </svg>
                            <span>Issues</span>
                        </Link>
                        <Link
                            to="/create"
                            className={`gh-nav-item ${location.pathname === "/create" ? "active" : ""}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-1 1v.879a1.75 1.75 0 0 1-1.5-1.72V2.5Z" />
                            </svg>
                            <span>New Repo</span>
                        </Link>
                        <Link
                            to="/profile"
                            className={`gh-nav-item ${location.pathname === "/profile" ? "active" : ""}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
                            </svg>
                            <span>Explore</span>
                        </Link>
                    </nav>
                </div>

                {/* Right Action Icons & Dropdowns */}
                <div className="gh-header-right">
                    {/* Create New / Plus Dropdown */}
                    <div className="gh-dropdown-wrapper" ref={plusRef}>
                        <button
                            className={`gh-btn-icon ${isPlusOpen ? "active" : ""}`}
                            onClick={() => setIsPlusOpen(!isPlusOpen)}
                            title="Create new..."
                            aria-expanded={isPlusOpen}
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z" />
                            </svg>
                            <svg className="gh-caret" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                                <path d="m4.427 6.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 6H4.604a.25.25 0 0 0-.177.427Z" />
                            </svg>
                        </button>

                        {isPlusOpen && (
                            <div className="gh-dropdown-menu gh-dropdown-right">
                                <Link
                                    to="/create"
                                    className="gh-dropdown-item"
                                    onClick={() => setIsPlusOpen(false)}
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-1 1v.879a1.75 1.75 0 0 1-1.5-1.72V2.5Z" />
                                    </svg>
                                    <span>New repository</span>
                                </Link>
                                <a
                                    href="#import"
                                    className="gh-dropdown-item"
                                    onClick={(e) => { e.preventDefault(); setIsPlusOpen(false); }}
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M2 2.75C2 1.784 2.784 1 3.75 1h8.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25Zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25Z" />
                                    </svg>
                                    <span>Import repository</span>
                                </a>
                                <a
                                    href="#gist"
                                    className="gh-dropdown-item"
                                    onClick={(e) => { e.preventDefault(); setIsPlusOpen(false); }}
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Z" />
                                    </svg>
                                    <span>New gist</span>
                                </a>
                                <div className="gh-dropdown-divider"></div>
                                <a
                                    href="#organization"
                                    className="gh-dropdown-item"
                                    onClick={(e) => { e.preventDefault(); setIsPlusOpen(false); }}
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M1.5 14.25c0 .414.336.75.75.75h11.5a.75.75 0 0 0 .75-.75V5.5a.75.75 0 0 0-.75-.75h-4v-2.5a.75.75 0 0 0-.75-.75h-6a.75.75 0 0 0-.75.75v12Zm1.5-.75V2.25h4.5v11.25H3Zm6 0V6h3.5v7.5H9Z" />
                                    </svg>
                                    <span>New organization</span>
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Notifications Bell Button */}
                    <div className="gh-dropdown-wrapper" ref={notifRef}>
                        <button
                            className={`gh-btn-icon gh-notif-btn ${isNotificationsOpen ? "active" : ""}`}
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            title="Notifications"
                            aria-expanded={isNotificationsOpen}
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.72 2.58A1.5 1.5 0 0 1 13.52 13H2.48a1.5 1.5 0 0 1-1.242-2.334l1.72-2.58A.25.25 0 0 0 3 7.947V5Z" />
                            </svg>
                            <span className="gh-notif-badge"></span>
                        </button>

                        {isNotificationsOpen && (
                            <div className="gh-dropdown-menu gh-notif-popover">
                                <div className="gh-notif-header">
                                    <span>Notifications</span>
                                    <span className="gh-badge-unread">0 unread</span>
                                </div>
                                <div className="gh-notif-body">
                                    <svg viewBox="0 0 16 16" width="32" height="32" fill="currentColor" className="gh-empty-bell">
                                        <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.72 2.58A1.5 1.5 0 0 1 13.52 13H2.48a1.5 1.5 0 0 1-1.242-2.334l1.72-2.58A.25.25 0 0 0 3 7.947V5Z" />
                                    </svg>
                                    <p>You have no unread notifications</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile Avatar Dropdown */}
                    <div className="gh-dropdown-wrapper" ref={profileRef}>
                        <button
                            className="gh-avatar-btn"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            title={`User menu for ${userDisplayName}`}
                            aria-expanded={isProfileOpen}
                        >
                            <div className="gh-avatar">
                                <span>{userInitial}</span>
                            </div>
                            <span className="gh-status-dot"></span>
                            <svg className="gh-caret" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                                <path d="m4.427 6.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 6H4.604a.25.25 0 0 0-.177.427Z" />
                            </svg>
                        </button>

                        {isProfileOpen && (
                            <div className="gh-dropdown-menu gh-profile-menu">
                                <div className="gh-profile-header">
                                    <span className="gh-profile-subtitle">Signed in as</span>
                                    <strong className="gh-profile-username">{userDisplayName}</strong>
                                </div>
                                <div className="gh-dropdown-divider"></div>
                                <Link
                                    to="/profile"
                                    className="gh-dropdown-item"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
                                    </svg>
                                    <span>Your profile</span>
                                </Link>
                                <Link
                                    to="/"
                                    className="gh-dropdown-item"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-1 1v.879a1.75 1.75 0 0 1-1.5-1.72V2.5Z" />
                                    </svg>
                                    <span>Your repositories</span>
                                </Link>
                                <Link
                                    to="/profile"
                                    className="gh-dropdown-item"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                                    </svg>
                                    <span>Your stars</span>
                                </Link>
                                <div className="gh-dropdown-divider"></div>
                                <a
                                    href="#settings"
                                    className="gh-dropdown-item"
                                    onClick={(e) => { e.preventDefault(); setIsProfileOpen(false); }}
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Z" />
                                    </svg>
                                    <span>Settings</span>
                                </a>
                                <div className="gh-dropdown-divider"></div>
                                <Link
                                    to="/logout"
                                    className="gh-dropdown-item gh-item-danger"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5h5.69Z" />
                                    </svg>
                                    <span>Sign out</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
