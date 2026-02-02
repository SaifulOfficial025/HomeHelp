import { BASE_URL } from "./config";

export const bookInspection = async (property_id, inspection_datetime) => {
  try {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      throw new Error("No access token found. Please login again.");
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/property/inspections/list/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          property_id,
          inspection_datetime,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to book inspection");
    }

    return data;
  } catch (error) {
    console.error("Book inspection error:", error);
    throw error;
  }
};

export const fetchInspections = async () => {
  try {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      throw new Error("No access token found. Please login again.");
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/property/inspections/list/`,
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
      throw new Error(data.message || "Failed to fetch inspections");
    }

    return data.data;
  } catch (error) {
    console.error("Fetch inspections error:", error);
    throw error;
  }
};
