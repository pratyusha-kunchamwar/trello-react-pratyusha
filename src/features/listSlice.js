import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

//fetch lists
export const fetchLists = createAsyncThunk(
  "fetchLists",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`
      );
      return { boardId, Item: response.data };
    } catch (error) {
      return rejectWithValue("Error in fetching List",error);
    }
  }
);
//create lists
export const createLists = createAsyncThunk(
  "createLists",
  async ({ listName,id }, { rejectWithValue }) => {

    try {
      let response = await axios.post(
        `${BASE_URL}/lists?name=${listName}&idBoard=${id}&key=${API_KEY}&token=${TOKEN}`
      );
      return { id, Lists: response.data };
    } catch (error) {
      return rejectWithValue("Error in creating List",error);
    }
  }
);
//delete the list
export const deleteLists = createAsyncThunk(
  "deleteLists",
  async (listId, rejectWithValue) => {
    try {
       await axios.put(
        `${BASE_URL}/lists/${listId}/closed?value=true&key=${API_KEY}&token=${TOKEN}`
      );
      return listId;
    } catch (error) {
      return rejectWithValue("Error in deleting List",error);
    }
  }
);
const listSlice = createSlice({
  name: "lists",
  initialState: {
    isLoading: false,
    listsData: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listsData[action.payload.boardId] = action.payload.Item;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLists.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.listsData[action.payload.id]) {
          state.listsData[action.payload.id] = [];
        }
        state.listsData[action.payload.id].push(action.payload.Lists)

      })
      .addCase(createLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLists.fulfilled, (state, action) => {
        state.isLoading = false;
        for (let boardId in state.listsData) {
          state.listsData[boardId] = state.listsData[boardId].filter(
            (list) => list.id !== action.payload
          );
        
        }
      })
      .addCase(deleteLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default listSlice.reducer;
