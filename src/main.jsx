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
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import WatchList from "./pages/Watchlist.jsx";

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
        path: "movies",
        loader: () => fetch("http://localhost:3000/movies"),
        Component: AllMovies,
      },
      {
        path: "movies/my-collection",
        element: (
          <PrivateRoute>
            <MyCollections></MyCollections>
          </PrivateRoute>
        ),
      },
      {
        path: "movies/add",
        element: (
          <PrivateRoute>
            <AddMovie></AddMovie>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "add-movie",
      //   element:<PrivateRoute><AddMovie></AddMovie></PrivateRoute>
      // },

      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "/movies/update/:id",
        element: (
          <PrivateRoute>
            <UpdateMovie></UpdateMovie>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movies/${params.id}`),
      },
      {
        path: "/watch-list",
        element: <WatchList></WatchList>,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "*",
        Component: NotFoundPage,
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
