import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import LoginPage from "./Pages/auth/LoginPage";
import RegisterPage from "./Pages/auth/RegisterPage";
import "./index.css";
import Dashboard from "./Pages/Dashboard";
import HomePage from "./Pages/HomePage";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-700 transition-all"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/RegisterPage",
    element: <RegisterPage />,
  },
  {
    path: "/HomePage",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
