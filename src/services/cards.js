import { getData, postData, deleteData } from "../api/apiCalls";

export const getCards = (listId) => getData(`/lists/${listId}/cards`);

export const addCards = (listId, cardName) =>
  postData({ idList: listId, name: cardName }, "cards");

export const deleteCards = (id) => deleteData(`cards/${id}`);
