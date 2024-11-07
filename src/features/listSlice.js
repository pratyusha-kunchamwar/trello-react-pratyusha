import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

export const fetchLists = createAsyncThunk(
  "fetchLists",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/boards/${id}/lists?key=${API_KEY}&token=${TOKEN}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Error in fetching List");
    }
  }
);
export const createLists = createAsyncThunk(
  "createLists",
  async ({ listName, id }, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${BASE_URL}/lists?name=${listName}&idBoard=${id}&key=${API_KEY}&token=${TOKEN}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Error in creating List");
    }
  }
);
export const deleteLists = createAsyncThunk(
  "deleteLists",
  async (listId, rejectWithValue) => {
    try {
      let response = await axios.put(
        `${BASE_URL}/lists/${listId}/closed?value=true&key=${API_KEY}&token=${TOKEN}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Error in deleting List");
    }
  }
);
const listSlice = createSlice({
  name: "lists",
  initialState: {
    isLoading: false,
    listsData: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listsData = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLists.fulfilled, (state, action) => {
        state.isLoading = false;
        let data = action.payload;
        state.listsData.push(data);
      })
      .addCase(createLists.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listsData = state.listsData.filter(
          (list) => list.id !== action.payload
        );
      })
      .addCase(deleteLists.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export default listSlice.reducer;
