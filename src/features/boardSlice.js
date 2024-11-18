import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoards, addBoards } from "../services /boards";

//fetch boards
export const fetchBoards = createAsyncThunk(
  "fetchBoards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBoards();
      return response;
    } catch (error) {
      return rejectWithValue("Error in fetching boards");
    }
  }
);

// create boards
export const createBoards = createAsyncThunk(
  "createBoards",
  async (boardName, { rejectWithValue }) => {
    try {
      const response = await addBoards(boardName);
      return response;
    } catch (error) {
      return rejectWithValue("Error in creating board");
    }
  }
);

// reducer
const boardSlice = createSlice({
  name: "boards",
  initialState: {
    isLoading: false,
    boardsData: [],
    isError: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boardsData = action.payload;
        state.isError = null;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      //create
      .addCase(createBoards.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boardsData.push(action.payload);
        state.isError = null;
      })
      .addCase(createBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default boardSlice.reducer;
