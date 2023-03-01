import "bootswatch/dist/cosmo/bootstrap.min.css";
import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

//compoent imports
import { NavBar } from "./components/navbar";
import { Homepage } from "./pages/HomePage/Homepage";
import { Login } from "./pages/Login/Login";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Logout from "./utils/Logout";

function App() {
  const [user, setUser] = useState({});

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<NavBar user={user} />}
        errorElement={<ErrorPage />}
      >
        {/* <Route
          path="/register"
          element={user?.name ? <Navigate to="/" /> : <RegisterUser />}
        /> */}
        <Route
          path="/login"
          element={user?.name ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route index element={<Homepage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
