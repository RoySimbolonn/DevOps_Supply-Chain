import { create } from "zustand";

const useStore = create((set) => ({
  show: false,
  showConfirm: false,
  setShow: (show) => set({ show: show }),
  setShowConfirm: (showConfirm) => set({ showConfirm: showConfirm }),
}));

export default useStore;
