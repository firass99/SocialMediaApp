//layoutpages
import Default from "../layouts/dashboard/default";

import SignIn from "../views/dashboard/auth/sign-in";
import SignUp from "../views/dashboard/auth/sign-up";
import { DefaultRouter } from "./default-router";
import { Layout1Router } from "./layout1-router";
import ProtectedRoute from "./protector/ProtectedRoute";

export const IndexRouters = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Default />
      </ProtectedRoute>
    ),
    children: [...DefaultRouter, ...Layout1Router],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
];
