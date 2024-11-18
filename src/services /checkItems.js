import { getData, postData, deleteData, updateData } from "../api/apiCalls";

export const getCheckItems = (listId) =>
  getData(`checklists/${listId}/checkItems`);

export const addCheckItems = (listName, listId) =>
  postData({ name: listName }, `checklists/${listId}/checkItems`);

export const deleteCheckItems = (listId, itemId) =>
  deleteData(`checklists/${listId}/checkItems/${itemId}`);

export const updateCheckItem = (cardId, itemId, state) =>
  updateData({ state: state }, `cards/${cardId}/checkItem/${itemId}`);
