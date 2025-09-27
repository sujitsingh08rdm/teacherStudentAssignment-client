import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./Components/Auth/AuthLayout";
import Login from "./Pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import CheckAuth from "./Components/Common/CheckAuth";
import store from "./store/store";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import StudentLayout from "./Components/Home/Student/StudentLayout";
import TeacherLayout from "./Components/Home/Teacher/TeacherLayout";
import Assignment from "./Pages/Assignment/Assignment";
import UnAuthPage from "./Components/Common/UnAuthPage";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (store) => store.auth
  );
  // console.log(user, isAuthenticated, isLoading);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        ></Route>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/teacher"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <TeacherLayout />
            </CheckAuth>
          }
        />
        <Route
          path="/teacher/assignments/:id"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Assignment />
            </CheckAuth>
          }
        />

        <Route
          path="/student"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <StudentLayout />
            </CheckAuth>
          }
        />
        <Route path="*" element={<div>Page not found</div>} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
