import { create } from "zustand";
import useAuthStore from "@/utils/authStore";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/axiosInstance";

const useStore = create((set) => ({
  product: null,
  loading: false,
  error: null,
  fetchProducts: async (url) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().getToken();
      const decodedToken = jwtDecode(token);
      const supplierId = decodedToken.userID;
      const res = await axiosInstance.get(`${url}?userId=${supplierId}`);
      set({ product: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;
