import React from "react";
import { useNavigate } from "react-router-dom";
import { PinIcon, StarIcon } from "@primer/octicons-react";

/**
 * PinnedRepos Component
 * Displays grid of user pinned or featured repositories.
 */
const PinnedRepos = ({ repositories = [] }) => {
    const navigate = useNavigate();
    const pinnedRepos = repositories.slice(0, 4);

    return (
        <section>
            <div className="pinned-section-header">
                <span>Pinned Repositories</span>
                <span style={{ fontSize: "12px", color: "var(--gh-text-secondary)", cursor: "pointer" }}>
                    Customize your pins
                </span>
            </div>

            {pinnedRepos.length === 0 ? (
                <div className="pinned-repo-card" style={{ padding: "24px", textAlign: "center" }}>
                    <p style={{ color: "var(--gh-text-secondary)", margin: 0 }}>
                        No pinned repositories available. Create or star repositories to pin them here.
                    </p>
                </div>
            ) : (
                <div className="pinned-grid">
                    {pinnedRepos.map((repo) => (
                        <div key={repo._id || repo.name} className="pinned-repo-card">
                            <div>
                                <div className="pinned-card-top">
                                    <a
                                        href={`/repo/${repo._id}`}
                                        className="repo-card-title"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/repo");
                                        }}
                                    >
                                        <PinIcon size={14} />
                                        {repo.name}
                                    </a>
                                    <span className="badge-visibility">
                                        {repo.visibility !== false ? "Public" : "Private"}
                                    </span>
                                </div>
                                <p className="repo-card-desc">
                                    {repo.description || "No description provided for this repository."}
                                </p>
                            </div>

                            <div className="repo-card-meta">
                                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span className="repo-lang-dot" />
                                    JavaScript
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                    <StarIcon size={14} />
                                    0
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default PinnedRepos;
