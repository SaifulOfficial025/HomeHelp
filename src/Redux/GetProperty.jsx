import { BASE_URL } from "./config";

export const fetchProperties = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await fetch(`${BASE_URL}/api/v1/property/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};
