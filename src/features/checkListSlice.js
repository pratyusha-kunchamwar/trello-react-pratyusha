import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

//fetch the lists
export const fetchCheckLists = createAsyncThunk(
  "fetchCheckList",
  async (cardId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
      );
      return { cardId, Item: response.data };
    } catch (error) {
      return rejectWithValue("Error in fetching the Checklists");
    }
  }
);
//createLists
export const createCheckLists = createAsyncThunk(
  "createLists",
  async ({ checkListName, cardId }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/cards/${cardId}/checklists?name=${checkListName}&key=${API_KEY}&token=${TOKEN}`
      );
      return { cardId, checkListName };
    } catch (error) {
      return rejectWithValue("Error in creating Checklists");
    }
  }
);

//delete checklist
export const deleteChecklists = createAsyncThunk(
  "deleteChecklists",
  async (checklistId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/checklists/${checklistId}?key=${API_KEY}&token=${TOKEN}`
      );
      return checklistId;
    } catch (error) {
      return rejectWithValue("Error in checklists delete");
    }
  }
);

const checkListSlice = createSlice({
  name: "checklLists",
  initialState: {
    isLoading: false,
    checkListsData: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCheckLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkListsData[action.payload.cardId] = action.payload.Item;
      })
      .addCase(fetchCheckLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //checklist
      .addCase(createCheckLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCheckLists.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.checkListsData[action.payload.cardId]) {
          state.checkListsData[action.payload.cardId] = [];
        }
        state.checkListsData[action.payload.cardId].push(
          action.payload.checkListName
        );
      })
      .addCase(createCheckLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //delete
      .addCase(deleteChecklists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteChecklists.fulfilled, (state, action) => {
        state.isLoading = false;
        for (let cardId in state.checkListsData) {
          state.checkListsData[cardId] = state.checkListsData[cardId].filter(
            (checklist) => checklist.id !== action.payload
          );
        }
      })
      .addCase(deleteChecklists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default checkListSlice.reducer;
