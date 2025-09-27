import { Navigate, useLocation } from "react-router-dom";

export default function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (!isAuthenticated && !location.pathname.includes("/login")) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated && location.pathname.includes("/login")) {
    if (user?.role === "teacher") {
      return <Navigate to="/teacher" replace />;
    } else {
      return <Navigate to="/student" replace />;
    }
  }

  if (
    isAuthenticated &&
    location.pathname.includes("/teacher") &&
    user?.role !== "teacher"
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  return <>{children}</>;
}
