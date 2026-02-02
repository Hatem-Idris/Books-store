
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const customStorage = {
  getItem: (name) => {
    return localStorage.getItem(name) || sessionStorage.getItem(name);
  },
  setItem: (name, value) => {
    const state = JSON.parse(value);
    if (state?.state?.rememberMe) {
      localStorage.setItem(name, value);
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.setItem(name, value);
      localStorage.removeItem(name);
    }
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      rememberMe: false,

      login: (token, rememberMe) => {
        set({
          token,
          isAuthenticated: true,
          rememberMe,
        });
      },

      logout: () => {
        set({
          token: null,
          isAuthenticated: false,
          rememberMe: false,
        });
      },
    }),
    {
      name: "auth-token",
      storage: createJSONStorage(() => customStorage),
    }
  )
);