import { BASE_URL } from "./config";

// Create new property
export const createProperty = async (formData) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/api/v1/property/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

// Get property by slug
export const getPropertyBySlug = async (slug) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/api/v1/property/${slug}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};

// Update property by slug
export const updateProperty = async (slug, formData) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/api/v1/property/${slug}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};
