import { BASE_URL } from "./config";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store the full response in localStorage
    localStorage.setItem("loginResponse", JSON.stringify(data));

    // Store tokens
    if (data.tokens) {
      localStorage.setItem("access_token", data.tokens.access);
      localStorage.setItem("refresh_token", data.tokens.refresh);
    }

    // Store user info
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
