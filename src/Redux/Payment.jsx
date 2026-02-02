import { BASE_URL } from "./config";

export const unlockProperty = async (slug) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/payments/properties/${slug}/unlock/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Payment Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error("Error unlocking property:", error);
    throw error;
  }
};
