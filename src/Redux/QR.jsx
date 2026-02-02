import { BASE_URL } from "./config";

export const fetchQRCode = async (slug) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/property/qr-code/${slug}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching QR code:", error);
    throw error;
  }
};
