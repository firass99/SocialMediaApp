import Index from "../views/dashboard/index";

//app
import FriendRequest from "../views/dashboard/app/friend-request";

// icon

// Form

// table

// blog pages

// Email

//ui-kit

// extrapages

export const DefaultRouter = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "users",
    element: <FriendRequest />,
  },
];
