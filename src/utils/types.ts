export type Theme = "light" | "dark";

export type RoleType = "admin" | "employee";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleType;
  avatar?: string;
}

export type FormLoginType = {
  email: string;
  password: string;
};

export type FormRegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  role: RoleType;
};

export type UserResponseType = {
  accessToken: string;
  user: User;
};
