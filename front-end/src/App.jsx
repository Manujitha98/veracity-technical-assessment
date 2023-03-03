import "bootswatch/dist/flatly/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
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
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./utils/PrivateRoutes";
import { WishList } from "./pages/WishList/WishList";
import { MovieDetails } from "./pages/MovieDetails/MovieDetails";
import UserContext from "./context/UserContext";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = authService.getCurrentUser();
    setUser(user);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />} errorElement={<ErrorPage />}>
        <Route
          path="/sign-up"
          element={user?.email ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={user?.email ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/logout" element={<Logout />} />

        <Route element={<PrivateRoutes user={user} />}>
          <Route path="/wish-list" element={<WishList user={user} />} />
        </Route>

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route index element={<Homepage />} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
