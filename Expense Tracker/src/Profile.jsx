import React, { useEffect, useState } from "react";
import { getProfile } from "./api"; 

import { FaMoneyBill } from "react-icons/fa";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUserInfo(res.data);
      } catch (err) {
        setError("Failed to load profile. Please log in again.");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="error-msg">{error}</div>;

  if (!userInfo) return <div>Loading profile...</div>;

  return (
    <div className="profile-card">
      <div className="profile-brand">
        FinSight
      </div>
      <div className="profile-details">
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Full Name:</strong> {userInfo.full_name ? userInfo.full_name : "Not provided"}</p>
      </div>

    </div>
  );
};

export default Profile;
