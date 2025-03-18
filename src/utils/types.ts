export type Theme = "light" | "dark";

export type RoleType = "admin" | "member";

export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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

export type FormRegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
};

export interface WorkspaceType {
  id: string;
  name: string;
  workspaceType: string;
  userId: string;
  members: string[];
}

export interface BoardType {
  id: string;
  name: string;
  workspaceId: string;
}

export interface ListType {
  id: string;
  name: string;
  boardId: string;
  position: number;
}

export interface CardType {
  id: string;
  title: string;
  description: string;
  listId: string;
  userId: string;
  status: CardStatusType;
}

export type CardStatusType = "in-complete" | "completed";

export interface WorkspaceWithBoardsType extends WorkspaceType {
  boards: BoardType[];
}

export interface BoardWithListsType extends BoardType {
  lists: ListType[];
}
