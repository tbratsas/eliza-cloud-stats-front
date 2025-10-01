import type { AuthProvider } from "@refinedev/core";

import { API_URL } from "./../config";

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      const { token } = await res.json();
      localStorage.setItem(TOKEN_KEY, token);

      // Return resolved promise with user info or token
      return Promise.resolve({ success: true });
    } catch (error) {
      // Explicitly reject to trigger onError
      return Promise.reject(error);
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
