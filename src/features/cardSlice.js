import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

//fetch cards
export const fetchCards = createAsyncThunk(
  "fetchCards",
  async (listId, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        `${BASE_URL}/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`
      );
      return { listId, cards: response.data };
    } catch (error) {
      return rejectWithValue("Error in fetching cards");
    }
  }
);
//create cards id,name
export const createCards = createAsyncThunk(
  "createCards",
  async ({ listId, cardName }, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${BASE_URL}/cards?idList=${listId}&name=${cardName}&key=${API_KEY}&token=${TOKEN}`
      );
      return { listId, cards: response.data };
    } catch (error) {
      return rejectWithValue("Error in creating the cards");
    }
  }
);
//delete the cards
export const deleteCards = createAsyncThunk(
  "deleteCards",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axios.delete(
        `${BASE_URL}/cards/${id}?key=${API_KEY}&token=${TOKEN}`
      );
      return id;
    } catch (error) {
      return rejectWithValue("Error in Deleting the cards");
    }
  }
);

export const cardSlice = createSlice({
  name: "cards",
  initialState: {
    isLoading: false,
    cardsData: {}, //with list key we store data
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cardsData[action.payload.listId] = action.payload.cards;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCards.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.cardsData[action.payload.listId]) {
          state.cardsData[action.payload.listId] = [];
        }
        state.cardsData[action.payload.listId].push(action.payload.cards);
      })
      .addCase(createCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCards.fulfilled, (state, action) => {
        state.isLoading = false;
        for (let listId in state.cardsData) {
          state.cardsData[listId] = state.cardsData[listId].filter(
            (card) => card.id !== action.payload
          );
        }
      })
      .addCase(deleteCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default cardSlice.reducer;
