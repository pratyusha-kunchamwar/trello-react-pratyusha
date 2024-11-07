import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

//fetch
export const fetchCheckItems = createAsyncThunk(
  "fetchCheckItems",
  async (checkListId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/checklists/${checkListId}/checkItems?key=${API_KEY}&token=${TOKEN}`
      );
      return { checkListId, Item: response.data };
    } catch (error) {
      rejectWithValue("Error in fetching Checklists");
    }
  }
);
//create items
export const createCheckItems = createAsyncThunk(
  "createCheckItems",
  async ({ checkListId, checkItemName }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${API_KEY}&token=${TOKEN}`
      );
      return { checkListId, checkItemName };
    } catch (error) {
      rejectWithValue("Error in creationg checkitmes");
    }
  }
);

//delete
export const deleteCheckItems = createAsyncThunk(
  "deleteCheckItems",
  async ({ checkListId, checkItemId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/checklists/${checkListId}/checkItems/${checkItemId}?key=${API_KEY}&token=${TOKEN}`
      );
      return checkItemId;
    } catch (error) {
      return rejectWithValue("Error in deletting the checkItem");
    }
  }
);

//update
export const updateCheckItems = createAsyncThunk(
  "updateCheckItems",
  async ({ cardId, checkItemId }, { getState, rejectWithValue }) => {
    if (!cardId) {
      return rejectWithValue("No CardId Exists");
    }
    try {
      const state = getState();
      let checkItem = null;

      for (let checklist in state.checkItems.checkItemsData) {
        checkItem = state.checkItems.checkItemsData[checklist].find(
          (item) => item.id === checkItemId
        );
      }

      if (!checkItem) {
        return rejectWithValue("No item is found");
      }
      const newState =
        checkItem.state === "complete" ? "incomplete" : "complete";

      await axios.put(
        `${BASE_URL}/cards/${cardId}/checkItem/${checkItemId}?state=${newState}&key=${API_KEY}&token=${TOKEN}`
      );
      return { checkItemId, newState };
    } catch (error) {
      return rejectWithValue("Error in updating the checkitem");
    }
  }
);
const checkItemSlice = createSlice({
  name: "checkitems",
  initialState: {
    isLoading: false,
    checkItemsData: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCheckItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkItemsData[action.payload.checkListId] = action.payload.Item;
      })
      .addCase(fetchCheckItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //create
      .addCase(createCheckItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCheckItems.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.checkItemsData[action.payload.checkListId]) {
          state.checkItemsData[action.payload.checkListId].push(
            action.payload.checkItemName
          );
        }
      })
      .addCase(createCheckItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //delete
      .addCase(deleteCheckItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCheckItems.fulfilled, (state, action) => {
        state.isLoading = false;
        for (let checkListId in state.checkItemsData) {
          state.checkItemsData[checkListId] = state.checkItemsData[
            checkListId
          ].filter((item) => {
            item.id !== action.payload;
          });
        }
      })
      .addCase(deleteCheckItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //update
      .addCase(updateCheckItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCheckItems.fulfilled, (state, action) => {
        state.isLoading = false;

        for (let checkListId in state.checkItemsData) {
          state.checkItemsData[checkListId] = state.checkItemsData[
            checkListId
          ].map((item) =>
            item.id === action.payload.checkItemId
              ? { ...item, state: action.payload.newState }
              : item
          );
        }
      })
      .addCase(updateCheckItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default checkItemSlice.reducer;
