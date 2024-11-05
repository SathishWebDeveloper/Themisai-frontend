import { lazy } from "react";
import { IRoutes } from "src/types";

export const publicRoutes: IRoutes[] = [
  {
    id: 1,
    name: "Login",
    path: "/",
    component: lazy(() => import("@container/auth/login")),
  },
  {
    id: 2,
    name: "Register",
    path: "/register",
    component: lazy(() => import("@container/auth/register")),
  },
  {
    id: 3,
    name: "404",
    path: "*",
    component: lazy(() => import("@container/PageNotFound")),
  },
];

export const privateRoutes: IRoutes[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    component: lazy(() => import("@container/dashboard")),
  },
  {
    id: 2,
    name: "Matters",
    path: "/matters",
    component: lazy(() => import("@container/matters")),
  },
  {
    id: 3,
    name: "New Matters",
    path: "/matters/new",
    component: lazy(() => import("@container/matters/create-matter")),
  },
  {
    id: 4,
    name: "View Matter",
    path: "/matters/:id",
    component: lazy(() => import("@container/matters/view-matter")),
  },
  {
    id: 5,
    name: "Reports",
    path: "/reports",
    component: lazy(() => import("@container/reports")),
  },
  {
    id: 6,
    name: "Settings",
    path: "/settings",
    component: lazy(() => import("@container/settings")),
  },
];
