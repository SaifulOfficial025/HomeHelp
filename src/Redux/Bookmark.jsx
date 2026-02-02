import { BASE_URL } from "./config";

export const addPropertyBookmark = async (property_id) => {
  try {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      throw new Error("No access token found. Please login again.");
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/property/bookmarks/list/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          property_id,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to bookmark property");
    }

    return data;
  } catch (error) {
    console.error("Bookmark error:", error);
    throw error;
  }
};
