import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import AllMovies from "./pages/AllMovies.jsx";
import MyCollections from "./pages/MyCollections.jsx";
import Login from "./pages/Login.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Register from "./pages/Register.jsx";
import AddMovie from "./pages/AddMovie.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import UpdateMovie from "./pages/UpdateMovie.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "all-movies",
        loader: () => fetch("http://localhost:3000/all-movies"),
        Component: AllMovies,
      },
      {
        path: "my-collections",
        Component: MyCollections,
      },
      {
        path: "add-movie",
        Component: AddMovie,
      },

      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "/edit-movie/:id",
        element: <UpdateMovie></UpdateMovie>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/all-movies/${params.id}`),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
