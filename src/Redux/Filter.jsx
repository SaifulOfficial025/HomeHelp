import { BASE_URL } from "./config";

export const fetchFilteredProperties = async (filters) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    // Build query params from filters
    const params = new URLSearchParams();

    if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
    if (filters.bathrooms) params.append("bathrooms", filters.bathrooms);
    if (filters.parking) params.append("parking", filters.parking);
    if (filters.has_pool !== null && filters.has_pool !== undefined) {
      params.append("has_pool", filters.has_pool);
    }
    if (filters.is_strata !== null && filters.is_strata !== undefined) {
      params.append("is_strata", filters.is_strata);
    }

    const url = `${BASE_URL}/api/v1/property/?${params.toString()}`;

    const response = await fetch(url, {
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

    if (data.success) {
      return data.data || [];
    } else {
      throw new Error(data.message || "Failed to fetch filtered properties");
    }
  } catch (error) {
    console.error("Error fetching filtered properties:", error);
    throw error;
  }
};
