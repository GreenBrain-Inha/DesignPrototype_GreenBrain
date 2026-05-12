import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Chat from "./pages/Chat";
import Challenges from "./pages/Challenges";
import ChallengeFeed from "./pages/ChallengeFeed";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Login },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "onboarding", Component: Onboarding },
      { path: "chat", Component: Chat },
      { path: "challenges", Component: Challenges },
      { path: "challenges/feed", Component: ChallengeFeed },
      { path: "profile", Component: Profile },
    ],
  },
]);
