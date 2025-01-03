import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ReadResult } from "../apis/userApi";

interface Store {
  token: string;
  user: ReadResult | null;
  updateToken(token: string): void;
  replaceUser(user: ReadResult): void;
  updateUser(name: string, photo: string, email: string): void;
  removeToken(): void;
}

const useAuthStore = create<Store>()(
  persist(
    immer((set) => ({
      token: "",
      user: null,
      updateToken(token) {
        set((state) => {
          state.token = token;
        });
      },
      removeToken() {
        set((state) => {
          state.token = "";
        });
      },
      replaceUser(user) {
        set((state) => {
          state.user = user;
        });
      },
      updateUser(name, photo, email) {
        set((state) => {
          if (state.user) {
            state.user.name = name;
            state.user.photo = photo;
            state.user.email = email;
          }
        });
      },
    })),
    { name: "auth" }
  )
);

export const authStore = useAuthStore.getState;
export default useAuthStore;
