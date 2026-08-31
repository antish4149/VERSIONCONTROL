import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from "../../Navbar.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        const fetchRepositories = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:3000/repo/user/${userId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setRepositories(data);
                    } else if (data && Array.isArray(data.repositories)) {
                        setRepositories(data.repositories);
                    } else {
                        setRepositories([]);
                    }
                } else {
                    setRepositories([]);
                }
            } catch (err) {
                console.error("Error while fetching user repositories: ", err);
                setRepositories([]);
            }
        };

        const fetchSuggestedRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3000/repo/all`);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setSuggestedRepositories(data);
                    } else if (data && Array.isArray(data.repositories)) {
                        setSuggestedRepositories(data.repositories);
                    } else {
                        setSuggestedRepositories([]);
                    }
                } else {
                    setSuggestedRepositories([]);
                }
            } catch (err) {
                console.error("Error while fetching suggested repositories: ", err);
                setSuggestedRepositories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRepositories();
        fetchSuggestedRepositories();
    }, []);

    useEffect(() => {
        if (!Array.isArray(repositories)) {
            setSearchResults([]);
            return;
        }

        if (searchQuery.trim() === "") {
            setSearchResults(repositories);
        } else {
            const filteredRepo = repositories.filter((repo) =>
                repo.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredRepo);
        }
    }, [searchQuery, repositories]);

    return (
        <div className="gh-dashboard-page">
            <Navbar />
            <div className="gh-dashboard-container">
                <section id="dashboard" className="gh-dashboard-grid">
                    {/* Left Sidebar: Suggested Repositories */}
                    <aside className="gh-aside-left">
                        <div className="gh-aside-header">
                            <h3>Suggested Repositories</h3>
                        </div>
                        <div className="gh-repo-list-small">
                            {suggestedRepositories && suggestedRepositories.length > 0 ? (
                                suggestedRepositories.slice(0, 6).map((repo) => (
                                    <div key={repo._id || repo.id || repo.name} className="gh-suggested-card">
                                        <div className="gh-card-top">
                                            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="gh-repo-icon">
                                                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-1 1v.879a1.75 1.75 0 0 1-1.5-1.72V2.5Z" />
                                            </svg>
                                            <h4 className="gh-repo-title">{repo.name}</h4>
                                        </div>
                                        {repo.description && (
                                            <p className="gh-repo-desc">{repo.description}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="gh-empty-text">No suggested repositories available.</p>
                            )}
                        </div>
                    </aside>

                    {/* Center Main Content: Your Repositories */}
                    <main className="gh-main-content">
                        <div className="gh-main-header">
                            <h2>Your Repositories</h2>
                            <Link to="/create" className="gh-create-repo-btn">
                                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-1 1v.879a1.75 1.75 0 0 1-1.5-1.72V2.5Z" />
                                </svg>
                                <span>New</span>
                            </Link>
                        </div>

                        <div id="search" className="gh-repo-search-box">
                            <input
                                type="text"
                                className="gh-repo-search-input"
                                value={searchQuery}
                                placeholder="Find a repository..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="gh-repo-feed">
                            {loading ? (
                                <div className="gh-loading-state">Loading repositories...</div>
                            ) : searchResults && searchResults.length > 0 ? (
                                searchResults.map((repo) => (
                                    <div key={repo._id || repo.id || repo.name} className="gh-repo-feed-item">
                                        <div className="gh-repo-feed-header">
                                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="gh-repo-icon">
                                                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-1 1v.879a1.75 1.75 0 0 1-1.5-1.72V2.5Z" />
                                            </svg>
                                            <h3 className="gh-feed-repo-name">{repo.name}</h3>
                                            <span className="gh-visibility-badge">
                                                {repo.visibility ? "Public" : "Private"}
                                            </span>
                                        </div>
                                        <p className="gh-feed-repo-desc">
                                            {repo.description || "No description provided."}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="gh-empty-feed">
                                    <svg viewBox="0 0 16 16" width="36" height="36" fill="currentColor" className="gh-empty-icon">
                                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-1 1v.879a1.75 1.75 0 0 1-1.5-1.72V2.5Z" />
                                    </svg>
                                    <p>No repositories found. Create your first repository to get started!</p>
                                    <Link to="/create" className="gh-create-repo-btn">Create Repository</Link>
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Right Sidebar: Upcoming Events */}
                    <aside className="gh-aside-right">
                        <div className="gh-aside-header">
                            <h3>Upcoming Events</h3>
                        </div>
                        <ul className="gh-events-list">
                            <li>
                                <div className="gh-event-badge">DEC 15</div>
                                <div className="gh-event-details">
                                    <strong>Tech Conference</strong>
                                    <p>Global open-source community keynote</p>
                                </div>
                            </li>
                            <li>
                                <div className="gh-event-badge">DEC 25</div>
                                <div className="gh-event-details">
                                    <strong>Developer Meetup</strong>
                                    <p>Fullstack & Web3 engineering talks</p>
                                </div>
                            </li>
                            <li>
                                <div className="gh-event-badge">JAN 05</div>
                                <div className="gh-event-details">
                                    <strong>React Summit</strong>
                                    <p>Next.js & modern UI frameworks showcase</p>
                                </div>
                            </li>
                        </ul>
                    </aside>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
