import { useEffect } from "react";
import { logout } from "../services/authService";

function Logout() {
  useEffect(() => {
    logout();
    window.location.href = "/login";
  });
  return null;
}

export default Logout;
