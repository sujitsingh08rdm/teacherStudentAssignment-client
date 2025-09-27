import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth-slice/index";
import TeacherReducer from "./teacher-slice/index";
import AssignmentReducer from "./assignment-slice/index";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    teacher: TeacherReducer,
    assignment: AssignmentReducer,
  },
});

export default store;
