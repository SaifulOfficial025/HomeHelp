import { BASE_URL } from "./config";

export const sendForgotPasswordOTP = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/user/forgot-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    return data;
  } catch (error) {
    console.error("Send OTP error:", error);
    throw error;
  }
};

export const verifyForgotPasswordOTP = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/user/verify-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid OTP");
    }

    return data;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
};

export const resetPassword = async (email, new_password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/user/reset-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, new_password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to reset password");
    }

    return data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};
