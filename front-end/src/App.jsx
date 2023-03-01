import "bootswatch/dist/flatly/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

//service imports
import authService from "./services/authService";

//compoent imports
import { NavBar } from "./components/navbar";
import { Homepage } from "./pages/HomePage/Homepage";
import { Login } from "./pages/Login/Login";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Logout from "./utils/Logout";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = authService.getCurrentUser();
    setUser(user);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<NavBar user={user} />}
        errorElement={<ErrorPage />}
      >
        <Route
          path="/sign-up"
          element={user?.name ? <Navigate to="/" /> : <SignUp />}
        />
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
