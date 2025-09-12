export const USER_ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  MANAGER: "manager",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type User = {
  created_at: string;
  email: string;
  id: string;
  name: string;
  role: UserRole;
  username: string;
};
