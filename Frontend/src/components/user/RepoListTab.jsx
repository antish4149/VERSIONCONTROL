import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RepoIcon } from "@primer/octicons-react";

/**
 * RepoListTab Component
 * Renders user repository list with client search filtering and visibility badges.
 */
const RepoListTab = ({ repositories = [] }) => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = useState("");

    const filteredRepos = useMemo(() => {
        if (!filterQuery.trim()) return repositories;
        return repositories.filter((repo) =>
            repo.name?.toLowerCase().includes(filterQuery.toLowerCase())
        );
    }, [repositories, filterQuery]);

    return (
        <section className="repos-list-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
                    User Repositories ({repositories.length})
                </h2>

                <input
                    type="text"
                    className="form-input"
                    placeholder="Find a repository..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    style={{ width: "240px" }}
                />
            </div>

            {filteredRepos.length === 0 ? (
                <div className="pinned-repo-card" style={{ padding: "32px", textAlign: "center" }}>
                    <RepoIcon size={32} style={{ color: "var(--gh-text-secondary)", marginBottom: "8px" }} />
                    <p style={{ color: "var(--gh-text-secondary)", margin: 0 }}>
                        {filterQuery ? `No repositories matching "${filterQuery}"` : "You don't have any public repositories yet."}
                    </p>
                </div>
            ) : (
                filteredRepos.map((repo) => (
                    <div key={repo._id || repo.name} className="repo-item-row">
                        <div className="repo-item-main">
                            <div className="repo-item-title-wrapper">
                                <a
                                    href={`/repo/${repo._id}`}
                                    className="repo-item-title"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/repo");
                                    }}
                                >
                                    {repo.name}
                                </a>
                                <span className="badge-visibility">
                                    {repo.visibility !== false ? "Public" : "Private"}
                                </span>
                            </div>
                            <p className="repo-card-desc">
                                {repo.description || "No repository description."}
                            </p>
                            <div className="repo-card-meta">
                                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span className="repo-lang-dot" />
                                    JavaScript
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
};

export default RepoListTab;
