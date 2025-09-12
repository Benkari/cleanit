import type { User } from "./user";

type AuthState = { user: User | null; isLoading: boolean };

export type AuthContextType = AuthState & {
  login: (user: User) => Promise<void>;
  logout: () => void;
};
