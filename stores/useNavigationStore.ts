// src/store.ts
import { create } from "zustand";

// Define the types for the store state
interface NavigationStore {
  showBrand: boolean;
  setShowBrand: (value: boolean) => void;
  transitionState: "open" | "close";
  setTransitionState: (value: "open" | "close") => void;
}

// Create the Zustand store with the defined types
const useNavigationStore = create<NavigationStore>((set) => ({
  showBrand: false,
  setShowBrand: (value) => set({ showBrand: value }),
  transitionState: "close",
  setTransitionState: (value) => set({ transitionState: value }),
}));

export default useNavigationStore;
