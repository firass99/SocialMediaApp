//pages

//market and profile pages
import Profile from "../views/dashboard/profiles/profile";

export const Layout1Router = [
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/users/:id",
    element: <Profile />,
  },
];
