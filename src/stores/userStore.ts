import { create } from "zustand";

export interface User {
  username: string;
  recieverName: string;
  connected: boolean;
  message: string;
}

interface UserStore {
  user: User;
  setUser: (user: Partial<User>) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {
    username: "",
    recieverName: "",
    connected: false,
    message: "",
  },
  setUser: (user: Partial<User>) =>
    set((state) => ({ user: { ...state.user, ...user } })),
}));

export default useUserStore;
