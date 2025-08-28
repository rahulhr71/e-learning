// components/AdminSettings.jsx
import React, { useState } from "react";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    password: "",
    avatar: "https://via.placeholder.com/80",
  });

  const [settings, setSettings] = useState({
    siteTitle: "E-Learning Platform",
    contactEmail: "support@example.com",
    defaultRole: "Student",
    theme: "light",
    notifications: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProfileSave = () => {
    alert("✅ Profile updated!");
  };

  const handleSettingsSave = () => {
    alert("✅ Settings saved!");
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ✅ Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Admin Profile</h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <input
            type="text"
            name="avatar"
            value={profile.avatar}
            onChange={handleProfileChange}
            placeholder="Avatar URL"
            className="border p-2 rounded w-full"
          />
        </div>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
          placeholder="Full Name"
          className="border p-2 rounded w-full mb-3"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
        />
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleProfileChange}
          placeholder="New Password"
          className="border p-2 rounded w-full mb-3"
        />
        <button
          onClick={handleProfileSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Profile
        </button>
      </div>

      {/* ✅ General Settings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">System Settings</h2>
        <input
          type="text"
          name="siteTitle"
          value={settings.siteTitle}
          onChange={handleSettingsChange}
          placeholder="Site Title"
          className="border p-2 rounded w-full mb-3"
        />
        <input
          type="email"
          name="contactEmail"
          value={settings.contactEmail}
          onChange={handleSettingsChange}
          placeholder="Contact Email"
          className="border p-2 rounded w-full mb-3"
        />
        <label className="block mb-3">
          Default Role:
          <select
            name="defaultRole"
            value={settings.defaultRole}
            onChange={handleSettingsChange}
            className="border p-2 rounded w-full"
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <label className="block mb-3">
          Theme:
          <select
            name="theme"
            value={settings.theme}
            onChange={handleSettingsChange}
            className="border p-2 rounded w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleSettingsChange}
          />
          Enable Notifications
        </label>
        <button
          onClick={handleSettingsSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
