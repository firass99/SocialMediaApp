import SignIn from "../views/dashboard/auth/sign-in";
import SignUp from "../views/dashboard/auth/sign-up";

export const IndexRouters = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
];
