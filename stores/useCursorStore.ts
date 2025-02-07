// src/store.ts
import { create } from "zustand";

// Define the types for the store state
interface CursorStore {
  cursorText: string;
  cursorVariant: "default" | "project" | "contact"; // You can expand this if you have more variants
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: "default" | "project" | "contact") => void;
}

// Create the Zustand store with the defined types
const useCursorStore = create<CursorStore>((set) => ({
  cursorText: "",
  cursorVariant: "default",
  setCursorText: (text) => set({ cursorText: text }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));

export default useCursorStore;
