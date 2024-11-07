import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from '../features/boardSlice'
import listsReducer from '../features/listSlice'
import cardReducer from "../features/cardSlice";
import checkListReducer from "../features/checkListSlice"
import checkItemReducer from"../features/checkItemSlice"

export const store = configureStore({
    reducer: {
        boards: boardsReducer,
        lists: listsReducer,
        cards: cardReducer,
        checklists: checkListReducer,
        checkItems:checkItemReducer
       
    }
    
})