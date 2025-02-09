// src/store.ts
import { create } from "zustand";

type PageState = "loading" | "ready";

// Define the types for the store state
interface NavigationStore {
  showBrand: boolean;
  setShowBrand: (value: boolean) => void;
  pageState: PageState;
  setPageState: (value: PageState) => void;
}

// Create the Zustand store with the defined types
const useNavigationStore = create<NavigationStore>((set) => ({
  showBrand: false,
  setShowBrand: (value) => set({ showBrand: value }),
  pageState: "loading",
  setPageState: (value) => set({ pageState: value }),
}));

export default useNavigationStore;
