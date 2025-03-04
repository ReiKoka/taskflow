/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicImport } from './routes/_public'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as PublicRegisterImport } from './routes/_public/register'
import { Route as PublicLoginImport } from './routes/_public/login'
import { Route as PublicAboutImport } from './routes/_public/about'
import { Route as AuthenticatedBoardsBoardIdImport } from './routes/_authenticated/boards/$boardId'

// Create/Update Routes

const PublicRoute = PublicImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PublicRegisterRoute = PublicRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => PublicRoute,
} as any)

const PublicLoginRoute = PublicLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => PublicRoute,
} as any)

const PublicAboutRoute = PublicAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => PublicRoute,
} as any)

const AuthenticatedBoardsBoardIdRoute = AuthenticatedBoardsBoardIdImport.update(
  {
    id: '/boards/$boardId',
    path: '/boards/$boardId',
    getParentRoute: () => AuthenticatedRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicImport
      parentRoute: typeof rootRoute
    }
    '/_public/about': {
      id: '/_public/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof PublicAboutImport
      parentRoute: typeof PublicImport
    }
    '/_public/login': {
      id: '/_public/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PublicLoginImport
      parentRoute: typeof PublicImport
    }
    '/_public/register': {
      id: '/_public/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof PublicRegisterImport
      parentRoute: typeof PublicImport
    }
    '/_authenticated/boards/$boardId': {
      id: '/_authenticated/boards/$boardId'
      path: '/boards/$boardId'
      fullPath: '/boards/$boardId'
      preLoaderRoute: typeof AuthenticatedBoardsBoardIdImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedBoardsBoardIdRoute: typeof AuthenticatedBoardsBoardIdRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedBoardsBoardIdRoute: AuthenticatedBoardsBoardIdRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

interface PublicRouteChildren {
  PublicAboutRoute: typeof PublicAboutRoute
  PublicLoginRoute: typeof PublicLoginRoute
  PublicRegisterRoute: typeof PublicRegisterRoute
}

const PublicRouteChildren: PublicRouteChildren = {
  PublicAboutRoute: PublicAboutRoute,
  PublicLoginRoute: PublicLoginRoute,
  PublicRegisterRoute: PublicRegisterRoute,
}

const PublicRouteWithChildren =
  PublicRoute._addFileChildren(PublicRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof PublicRouteWithChildren
  '/about': typeof PublicAboutRoute
  '/login': typeof PublicLoginRoute
  '/register': typeof PublicRegisterRoute
  '/boards/$boardId': typeof AuthenticatedBoardsBoardIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof PublicRouteWithChildren
  '/about': typeof PublicAboutRoute
  '/login': typeof PublicLoginRoute
  '/register': typeof PublicRegisterRoute
  '/boards/$boardId': typeof AuthenticatedBoardsBoardIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_public': typeof PublicRouteWithChildren
  '/_public/about': typeof PublicAboutRoute
  '/_public/login': typeof PublicLoginRoute
  '/_public/register': typeof PublicRegisterRoute
  '/_authenticated/boards/$boardId': typeof AuthenticatedBoardsBoardIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/about' | '/login' | '/register' | '/boards/$boardId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/about' | '/login' | '/register' | '/boards/$boardId'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/_public'
    | '/_public/about'
    | '/_public/login'
    | '/_public/register'
    | '/_authenticated/boards/$boardId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  PublicRoute: typeof PublicRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  PublicRoute: PublicRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/_public"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/boards/$boardId"
      ]
    },
    "/_public": {
      "filePath": "_public.tsx",
      "children": [
        "/_public/about",
        "/_public/login",
        "/_public/register"
      ]
    },
    "/_public/about": {
      "filePath": "_public/about.tsx",
      "parent": "/_public"
    },
    "/_public/login": {
      "filePath": "_public/login.tsx",
      "parent": "/_public"
    },
    "/_public/register": {
      "filePath": "_public/register.tsx",
      "parent": "/_public"
    },
    "/_authenticated/boards/$boardId": {
      "filePath": "_authenticated/boards/$boardId.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
