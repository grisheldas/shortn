import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";
import AuthPage from "./pages/auth";
import LinkPage from "./pages/link";
import RedirectPage from "./pages/redirect-link";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/link/:id",
        element: <LinkPage />,
      },
      {
        path: "/:id",
        element: <RedirectPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
