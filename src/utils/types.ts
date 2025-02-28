export type Theme = "light" | "dark";

export type RoleType = "admin" | "employee";

export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleType;
  avatar?: string;
}

export interface User extends AuthenticatedUser {
  password: string;
}

export type FormLoginType = {
  email: string;
  password: string;
};

export type UserResponseType = {
  accessToken: string;
  user: AuthenticatedUser;
};
