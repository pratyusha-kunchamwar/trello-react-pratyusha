import { getData, postData, archiveData } from "../api/apiCalls";

export const getLists = (id) => getData(`boards/${id}/lists`);

export const addLists = (id, listName) =>
  postData({ name: listName, idBoard: id }, "lists");

export const deleteLists = (listId) =>
  archiveData(`lists/${listId}/closed?value=true`);
