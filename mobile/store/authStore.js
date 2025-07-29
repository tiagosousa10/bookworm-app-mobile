import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
}));
