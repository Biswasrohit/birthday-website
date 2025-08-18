import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "./pages/Landing";
import Itinerary from "./pages/Itinerary";
import Activity from "./pages/Activity";
import Notes from "./pages/Notes"; // ← add

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "itinerary", element: <Itinerary /> },
      { path: "activity/:slug", element: <Activity /> },
      { path: "notes", element: <Notes /> }, // ← add
    ],
  },
]);

export default router;
