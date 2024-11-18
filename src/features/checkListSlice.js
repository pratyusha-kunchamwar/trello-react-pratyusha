// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const {
//   VITE_API_KEY: API_KEY,
//   VITE_TOKEN: TOKEN,
//   VITE_BASE_URL: BASE_URL,
// } = import.meta.env;

// //fetch the lists
// export const fetchCheckLists = createAsyncThunk(
//   "fetchCheckList",
//   async (cardId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
//       );
      
//       return { cardId, Item: response.data };
//     } catch (error) {
//       return rejectWithValue("Error in fetching the Checklists",error);
//     }
//   }
// );
// //createLists
// export const createCheckLists = createAsyncThunk(
//   "createLists",
//   async ({ checkListName, cardId }, { rejectWithValue }) => {
//     try {
//      const response= await axios.post(
//         `${BASE_URL}/cards/${cardId}/checklists?name=${checkListName}&key=${API_KEY}&token=${TOKEN}`
//       );
//       return { cardId, checkListName:response.data };
//     } catch (error) {
//       return rejectWithValue("Error in creating Checklists",error);
//     }
//   }
// );

// //delete checklist
// export const deleteChecklists = createAsyncThunk(
//   "deleteChecklists",
//   async (checklistId, { rejectWithValue }) => {
//     try {
//       await axios.delete(
//         `${BASE_URL}/checklists/${checklistId}?key=${API_KEY}&token=${TOKEN}`
//       );
//       return checklistId;
//     } catch (error) {
//       return rejectWithValue("Error in checklists delete",error);
//     }
//   }
// );

// const checkListSlice = createSlice({
//   name: "checklLists",
//   initialState: {
//     isLoading: false,
//     checkListsData: {},
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCheckLists.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchCheckLists.fulfilled, (state, action) => {
//         state.isLoading = false;
//         console.log(action.payload.Item);
//         state.checkListsData[action.payload.cardId] = action.payload.Item;
//       })
//       .addCase(fetchCheckLists.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       //checklist
//       .addCase(createCheckLists.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createCheckLists.fulfilled, (state, action) => {
//         state.isLoading = false;
//         if (!state.checkListsData[action.payload.cardId]) {
//           state.checkListsData[action.payload.cardId] = [];
//         }
//         state.checkListsData[action.payload.cardId].push(
//           action.payload.checkListName
//         );
//       })
//       .addCase(createCheckLists.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       //delete
//       .addCase(deleteChecklists.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteChecklists.fulfilled, (state, action) => {
//         state.isLoading = false;
//         for (let cardId in state.checkListsData) {
//           state.checkListsData[cardId] = state.checkListsData[cardId].filter(
//             (checklist) => checklist.id !== action.payload
//           );
//         }
//       })
//       .addCase(deleteChecklists.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default checkListSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

// Fetch the lists
export const fetchCheckLists = createAsyncThunk(
  "fetchCheckList",
  async (cardId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
      );
      return { cardId, items: response.data }; // Returning as 'items' instead of 'Item'
    } catch (error) {
      return rejectWithValue("Error in fetching the Checklists", error);
    }
  }
);

// Create Lists
export const createCheckLists = createAsyncThunk(
  "createLists",
  async ({ checkListName, cardId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/cards/${cardId}/checklists?name=${checkListName}&key=${API_KEY}&token=${TOKEN}`
      );
      return { cardId, checkList: response.data }; // Returning as 'checkList' for consistency
    } catch (error) {
      return rejectWithValue("Error in creating Checklists", error);
    }
  }
);

// Delete Checklist
export const deleteChecklists = createAsyncThunk(
  "deleteChecklists",
  async (checklistId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/checklists/${checklistId}?key=${API_KEY}&token=${TOKEN}`
      );
      return checklistId;
    } catch (error) {
      return rejectWithValue("Error in checklist delete", error);
    }
  }
);

const checkListSlice = createSlice({
  name: "checkLists",
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
        // Ensure data is structured as expected
        console.log("Fetched Checklists:", action.payload.items); // Logging fetched data
        state.checkListsData[action.payload.cardId] = action.payload.items;
      })
      .addCase(fetchCheckLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Error handling
      })

      // Create Checklist
      .addCase(createCheckLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCheckLists.fulfilled, (state, action) => {
        state.isLoading = false;
        // Ensure checkList is pushed correctly
        if (!state.checkListsData[action.payload.cardId]) {
          state.checkListsData[action.payload.cardId] = [];
        }
        state.checkListsData[action.payload.cardId].push(action.payload.checkList); // Push the full checklist
      })
      .addCase(createCheckLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Error handling
      })

      // Delete Checklist
      .addCase(deleteChecklists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteChecklists.fulfilled, (state, action) => {
        state.isLoading = false;
        // Filter the deleted checklist from the data
        for (let cardId in state.checkListsData) {
          state.checkListsData[cardId] = state.checkListsData[cardId].filter(
            (checklist) => checklist.id !== action.payload
          );
        }
      })
      .addCase(deleteChecklists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Error handling
      });
  },
});

export default checkListSlice.reducer;

