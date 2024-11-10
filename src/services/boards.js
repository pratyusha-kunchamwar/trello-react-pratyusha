import { getData, postData } from "../api/apiCalls";

export const getBoards = () => getData("members/me/boards");

export const addBoards = (boardName) => postData({ name: boardName }, "boards");
