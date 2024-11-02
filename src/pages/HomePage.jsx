import axios from "axios";
import React, { useState, useEffect } from "react";
import AllBoards from "../components/AllBoards";
import CreateBoardOrCard from "../components/CreateBoardOrCard";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

const HomePage = () => {
  const [board, setBoard] = useState([]);
  const [error, setError] = useState([]);

  //fetch boards
  const fetchBoards = async () => {
    try {
      const responce = await axios.get(
        `${BASE_URL}/members/me/boards?key=${API_KEY}&token=${TOKEN}`
      );
      setBoard(responce.data);
    } catch (error) {
      setError(error);
    }
  };
  //create boards
  const createBoards = async (boardName) => {
    try {
      await axios.post(`${BASE_URL}/boards?key=${API_KEY}&token=${TOKEN}`, {
        name: boardName,
      });
      fetchBoards();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div
      style={{
        margin: "2rem",
        backgroundColor: "black",
        backgroundImage: `url("https://plus.unsplash.com/premium_photo-1683309568772-57011d6c1b7b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9kb3xlbnwwfHwwfHx8MA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        width: "100%",
      }}
    >
      <CreateBoardOrCard
        prop={{
          onCreate: createBoards,
          heading: "Create Board",
          label: "Board Name",
          element: "board",
        }}
      />
      <h1 style={{ color: "black" }}>Boards</h1>
      <AllBoards boards={board} />
    </div>
  );
};

export default HomePage;
