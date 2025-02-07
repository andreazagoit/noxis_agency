// src/store.ts
import { CursorVariants } from "@/components/ui/cursor";
import { create } from "zustand";

// Define the types for the store state
interface CursorStore {
  cursorText: string;
  cursorVariant: CursorVariants;
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: CursorVariants) => void;
}

// Create the Zustand store with the defined types
const useCursorStore = create<CursorStore>((set) => ({
  cursorText: "",
  cursorVariant: "default",
  setCursorText: (text) => set({ cursorText: text }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));

export default useCursorStore;
