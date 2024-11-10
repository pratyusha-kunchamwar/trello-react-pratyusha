import axios from "axios";
import React, { useState, useEffect } from "react";
import CreateBoardOrCard from "../components/CreateBoardOrCard";
import AllBoards from "../components/AllBoards";
import { getBoards,addBoards } from "../services/boards";


const HomePage = () => {
  const [board, setBoard] = useState([]);
  const [error, setError] = useState([]);

  // fetch boards
  const fetchBoards = async () => {
    try {
      const response = await getBoards();
      setBoard(response);
    } catch (error) {
      setError(error);
      setBoard([]);
    }
  };

  // create boards
  const createBoards = async (boardName) => {
    try {
      await addBoards(boardName);
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
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
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

      <h1 style={{ color: "black", marginLeft: "2rem" }}>Boards</h1>
      {Array.isArray(board) && board.length > 0 ? (
        <AllBoards boards={board} />
      ) : (
        <p>No boards available.</p>
      )}
    </div>
  );
};

export default HomePage;
