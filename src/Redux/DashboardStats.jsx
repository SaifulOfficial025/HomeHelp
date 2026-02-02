import { BASE_URL } from "./config";

export const fetchDashboardStats = async () => {
  try {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      throw new Error("No access token found. Please login again.");
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/property/statistics/user/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch dashboard statistics");
    }

    return data.data;
  } catch (error) {
    console.error("Dashboard stats error:", error);
    throw error;
  }
};
