import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Variant = "info" | "success" | "danger";

interface Store {
  message: string;
  variant: Variant;
  timeoutId: NodeJS.Timeout | null;
  persist: boolean;
}

interface State extends Store {
  replace(variant: Variant, message: string, persist?: true): void;
  clear(): void;
}

const initialState: Store = {
  variant: "info",
  message: "",
  timeoutId: null,
  persist: false,
};

const useAlertStore = create<State>()(
  immer((set, get) => ({
    ...initialState,

    replace(variant, message, persist) {
      set((state) => {
        state.variant = variant;
        state.message = message;
        state.persist = Boolean(persist);
        if (state.timeoutId) state.clear();
        state.timeoutId = setTimeout(state.clear, 6000);
      });
    },

    clear() {
      const state = get();
      if (state.timeoutId) clearTimeout(state.timeoutId);
      set({ ...initialState });
    },
  }))
);

export const alertStore = useAlertStore.getState;
export default useAlertStore;
