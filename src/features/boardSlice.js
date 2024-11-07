import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

//fetch boards
export const fetchBoards = createAsyncThunk(
  "fetchBoards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/members/me/boards?key=${API_KEY}&token=${TOKEN}`
      );
      return response.data;
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
      const response = await axios.post(
        `${BASE_URL}/boards?key=${API_KEY}&token=${TOKEN}`,
        {
          name: boardName,
        }
      );
      return response.data;
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
