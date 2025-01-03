import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Variant = "info" | "success" | "danger";

interface State {
  id: number | null;
  message: string;
  variant: Variant;
  proceeding: boolean;
  replace(variant: Variant, message: string, id: number): void;
  clear(): void;
  replaceProceeding(proceeding: boolean): void;
}

const useConfirmStore = create<State>()(
  immer((set) => ({
    id: null,
    variant: "info",
    message: "",
    proceeding: false,

    replace(variant, message, id) {
      set({ variant, message, id });
    },
    clear() {
      set({ id: null, message: "", variant: "info" });
    },
    replaceProceeding(proceeding) {
      set({ proceeding });
    },
  }))
);

export default useConfirmStore;
