import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { sendPasswordReset, auth } from "../../utils/firebase/firebase.utils";
import { updateProfile, updatePassword } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  ProfileContainer,
  ProfileSection,
  MessageText,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
} from "./user-profile.styles";

const UserProfile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        displayName: currentUser.displayName || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser || !auth.currentUser) return;

    setIsLoading(true);
    setMessage("");

    try {
      await updateProfile(auth.currentUser, {
        displayName: profileData.displayName,
      });
      setMessage("Profile updated successfully!");
    } catch (error: any) {
      setMessage("Error updating profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser || !auth.currentUser) return;

    const { newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await updatePassword(auth.currentUser, newPassword);
      setMessage("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      let errorMessage = "Error updating password. Please try again.";

      if (error.code === "auth/requires-recent-login") {
        errorMessage =
          "Please sign out and sign in again before changing your password.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
      }

      setMessage(errorMessage);
      console.error("Password update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <ProfileContainer>
        <MessageText>Please sign in to view your profile.</MessageText>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar>
          {currentUser.displayName
            ? currentUser.displayName.charAt(0).toUpperCase()
            : "U"}
        </ProfileAvatar>
        <ProfileInfo>
          <h2>{currentUser.displayName || "User"}</h2>
          <p>{currentUser.email}</p>
        </ProfileInfo>
      </ProfileHeader>

      <ProfileSection>
        <h3>Update Profile</h3>
        <form onSubmit={handleProfileSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            name="displayName"
            value={profileData.displayName}
            onChange={handleProfileChange}
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={profileData.email}
            disabled
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </ProfileSection>

      <ProfileSection>
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <FormInput
            label="New Password"
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />

          <FormInput
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </ProfileSection>

      {message && <MessageText>{message}</MessageText>}
    </ProfileContainer>
  );
};

export default UserProfile;
