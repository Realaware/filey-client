import { create } from "zustand";

interface User {
  name: string;
  id: number;
}

interface UploadedFile {
  uuid: string;
  createdAt: string;
  path: string;
  private: boolean;
  uploaderId: number;
  metadata: any;
}

interface ZustandStore {
  user: User | undefined;
  setUser: (user: User) => void;
}

const useClientStore = create<ZustandStore>((set) => ({
  user: undefined,

  setUser: (user) => {
    set({ user });
  },
}));

export { useClientStore };
export type { User, ZustandStore, UploadedFile };
