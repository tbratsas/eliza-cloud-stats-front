import type { AuthProvider } from "@refinedev/core";

import { API_URL } from "./../config";

export const TOKEN_KEY = "auth";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem(TOKEN_KEY, token);
        return {
          success: true,
          redirectTo: "/sales_per_product", // optional redirect
        };
      }

      return {
        success: false,
        error: {
          message: "Login failed",
          name: "LoginError",
        },
      };
    } catch (err) {
      return {
        success: false,
        error: {
          message: "Network error",
          name: "NetworkError",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "Eliza Superuser",
        avatar: "https://i.pravatar.cc/150?img=50",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
