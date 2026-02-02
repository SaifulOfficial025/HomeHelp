import { BASE_URL } from "./config";

export const fetchFeaturedProperties = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/api/v1/property/featured/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch featured properties");
    }

    const data = await response.json();
    return data.data; // Return the data array from response
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    throw error;
  }
};
