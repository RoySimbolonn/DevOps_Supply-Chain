import { create } from "zustand";
import axios from "axios";
import useAuthStore from "@/utils/authStore";
import axiosInstance from "@/axiosInstance";

const useStore = create((set) => ({
  transaction: [],
  loading: false,
  error: null,
  fetchTransactions: async (url) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().getToken();
      const res = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ transaction: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;
