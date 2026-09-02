import React, { useMemo } from "react";
import "./Profile.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

/**
 * GitHub Contribution HeatMap Component
 * Generates a 52-week grid simulating GitHub contribution activity metrics.
 */
const HeatMapProfile = () => {
    // Generate dummy 365 days of activity data deterministically for visual consistency
    const contributionData = useMemo(() => {
        const weeks = [];
        let totalCount = 0;

        for (let w = 0; w < 52; w++) {
            const days = [];
            for (let d = 0; d < 7; d++) {
                // Generate varied contribution counts with realistic GitHub pattern
                const seed = (w * 7 + d * 13) % 100;
                let count = 0;
                if (seed > 75) count = Math.floor(seed % 4) + 1;
                if (seed > 92) count = Math.floor(seed % 8) + 5;

                totalCount += count;
                days.push({
                    dayIndex: d,
                    count,
                    level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4,
                });
            }
            weeks.push(days);
        }
        return { weeks, totalCount };
    }, []);

    return (
        <div className="heatmap-container">
            <div className="heatmap-header">
                <span className="heatmap-title">
                    <strong>{contributionData.totalCount}</strong> contributions in the last year
                </span>
                <span className="heatmap-subtext">Contribution settings ▾</span>
            </div>

            <div className="heatmap-card">
                <div className="heatmap-grid-wrapper">
                    {/* Month header row */}
                    <div className="heatmap-months">
                        {MONTHS.map((month, idx) => (
                            <span key={idx} className="heatmap-month-label">
                                {month}
                            </span>
                        ))}
                    </div>

                    <div className="heatmap-body">
                        {/* Day labels column */}
                        <div className="heatmap-days">
                            {DAYS.map((day, idx) => (
                                <span key={idx} className="heatmap-day-label">
                                    {day}
                                </span>
                            ))}
                        </div>

                        {/* 52 Weeks Grid */}
                        <div className="heatmap-weeks">
                            {contributionData.weeks.map((week, wIdx) => (
                                <div key={wIdx} className="heatmap-week">
                                    {week.map((day, dIdx) => (
                                        <div
                                            key={dIdx}
                                            className={`heatmap-cell level-${day.level}`}
                                            title={`${day.count} contributions`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="heatmap-footer">
                    <a href="#learn-more" className="heatmap-footer-link">
                        Learn how we count contributions
                    </a>
                    <div className="heatmap-legend">
                        <span>Less</span>
                        <div className="heatmap-cell level-0" />
                        <div className="heatmap-cell level-1" />
                        <div className="heatmap-cell level-2" />
                        <div className="heatmap-cell level-3" />
                        <div className="heatmap-cell level-4" />
                        <span>More</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeatMapProfile;
