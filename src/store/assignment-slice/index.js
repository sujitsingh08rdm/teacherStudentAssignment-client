import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assignmentList: [],
  submissions: [],
};

export const getAssigmentForStudent = createAsyncThunk(
  "/assignment/getAllStudent",
  async () => {
    const response = await axios.get("http://localhost:5000/api/assignment/");
    return response.data;
  }
);

export const submitAssignment = createAsyncThunk(
  "/assignment/submit",
  async ({ assignmentId, submission }) => {
    const response = await axios.post(
      `http://localhost:5000/api/assignment/${assignmentId}/submit`,
      submission
    );

    return response.data;
  }
);

export const getAssignmentForTeacher = createAsyncThunk(
  "/assignment/getAllTeacher",
  async (assignmentId) => {
    const response = await axios.get(
      `http://localhost:5000/api/assignment/${assignmentId}/submissions`
    );
    return response.data;
  }
);

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssigmentForStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssigmentForStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload.data, "from assignment slice");
        state.assignmentList = action.payload.data;
      })
      .addCase(getAssigmentForStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.assignmentList = [];
      })
      .addCase(submitAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitAssignment.fulfilled, (state, action) => {
        state.isLoading = false;

        const updated = action.payload.assignment;
        state.assignmentList = state.assignmentList.map((a) =>
          a._id === updated._id ? updated : a
        );
      })
      .addCase(submitAssignment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to submit assignment";
      })
      .addCase(getAssignmentForTeacher.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        state.submissions = action.payload.data.submissions;
      });
  },
});

export default assignmentSlice.reducer;
