import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assignmentList: [],
  assignmentDetails: null,
  isLoading: false,
};

export const getAllAssignments = createAsyncThunk(
  "/teacher/getAll",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/teacher/getAll"
    );
    return response.data;
  }
);

export const createAssignment = createAsyncThunk(
  "/teacher/create",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/teacher/create",
      formData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    console.log(response?.data);
    return response?.data;
  }
);

export const deleteAssignment = createAsyncThunk(
  "/teacher/delete",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/teacher/delete/${id}`
    );
    return result?.data;
  }
);

export const updateAssignment = createAsyncThunk(
  "/teacher/edit",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/teacher/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssignments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAssignments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assignmentList = action.payload.data;
      })
      .addCase(getAllAssignments.rejected, (state, action) => {
        state.isLoading = false;
        state.assignmentList = [];
      });
  },
});

export default teacherSlice.reducer;
