import { getData, postData, deleteData } from "../api/apiCalls";

export const getCheckList = (cardId) => getData(`cards/${cardId}/checklists`);

export const addCheckList = (name, cardId) =>
  postData({ name: name }, `cards/${cardId}/checklists`);

export const deleteCheckList = (id) => deleteData(`checklists/${id}`);
