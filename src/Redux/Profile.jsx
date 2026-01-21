import { BASE_URL } from "./config";

export const getProfileData = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/api/v1/user/profile-data/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch profile data");
    }

    return data;
  } catch (error) {
    console.error("Get profile data error:", error);
    throw error;
  }
};

export const updateProfile = async (profileData, imageFile = null) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    let body;
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    // If there's an image file, use FormData
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      // Add other fields
      if (profileData.full_name) {
        formData.append("full_name", profileData.full_name);
      }
      if (profileData.phone) {
        formData.append("phone", profileData.phone);
      }

      body = formData;
      // Don't set Content-Type header for FormData, browser will set it automatically with boundary
    } else {
      // If no image, send as JSON
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(profileData);
    }

    const response = await fetch(`${BASE_URL}/api/v1/user/profile/update/`, {
      method: "PATCH",
      headers: headers,
      body: body,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    return data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};
