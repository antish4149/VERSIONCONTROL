import React, { useState } from "react";
import axios from "axios";
import { CheckIcon, AlertIcon } from "@primer/octicons-react";

const API_BASE_URL = "http://localhost:3000";

/**
 * ProfileSettingsTab Component
 * Renders user profile update form with client-side schema validation and API submission.
 */
const ProfileSettingsTab = ({ user, userId, onProfileUpdated }) => {
    const [editForm, setEditForm] = useState({
        email: user?.email || "",
        password: ""
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Form validation rules
    const validateForm = () => {
        const errors = {};
        if (!editForm.email) {
            errors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (editForm.password && editForm.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdateSuccess(false);

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // [BACKEND ENDPOINT 3]: PUT /users/:id
            const payload = {};
            if (editForm.email) payload.email = editForm.email;
            if (editForm.password) payload.password = editForm.password;

            const res = await axios.put(`${API_BASE_URL}/users/${userId}`, payload);

            if (res.data?.user) {
                onProfileUpdated(res.data.user);
            }
            setUpdateSuccess(true);
            setEditForm((prev) => ({ ...prev, password: "" }));
            setValidationErrors({});
        } catch (err) {
            console.error("Failed to update user profile: ", err);
            setValidationErrors({
                server: err.response?.data?.message || "Failed to update profile. Please try again."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="settings-panel-card">
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>
                Profile Settings & Security
            </h2>

            {updateSuccess && (
                <div
                    style={{
                        backgroundColor: "rgba(46, 160, 67, 0.15)",
                        border: "1px solid var(--gh-accent-green)",
                        color: "var(--gh-accent-green-hover)",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        fontSize: "14px",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    <CheckIcon size={16} />
                    Profile details updated successfully!
                </div>
            )}

            {validationErrors.server && (
                <div className="field-error-msg" style={{ marginBottom: "16px", fontSize: "14px" }}>
                    <AlertIcon size={14} style={{ marginRight: "6px" }} />
                    {validationErrors.server}
                </div>
            )}

            <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                    <label className="form-label" htmlFor="profile-username">Username</label>
                    <input
                        id="profile-username"
                        className="form-input"
                        type="text"
                        value={user?.username || ""}
                        disabled
                        style={{ opacity: 0.6, cursor: "not-allowed" }}
                    />
                    <span style={{ fontSize: "12px", color: "var(--gh-text-secondary)" }}>
                        Usernames cannot be changed directly.
                    </span>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="profile-email">Email Address</label>
                    <input
                        id="profile-email"
                        className="form-input"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        placeholder="your.email@domain.com"
                    />
                    {validationErrors.email && (
                        <span className="field-error-msg">{validationErrors.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="profile-password">New Password</label>
                    <input
                        id="profile-password"
                        className="form-input"
                        type="password"
                        value={editForm.password}
                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                        placeholder="Leave blank to keep unchanged"
                    />
                    {validationErrors.password && (
                        <span className="field-error-msg">{validationErrors.password}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn-primary-submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving Changes..." : "Update Profile"}
                </button>
            </form>
        </section>
    );
};

export default ProfileSettingsTab;
