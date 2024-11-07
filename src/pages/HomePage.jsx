import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AllBoards from "../components/AllBoards";
import CreateComponent from "../components/CreateComponent";
import { fetchBoards, createBoards } from "../features/boardSlice";

const HomePage = () => {
  const { isLoading, boardsData, error } = useSelector((state) => state.boards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  const handleCreateBoards = (boardName) => {
    dispatch(createBoards(boardName)).then(() => dispatch(fetchBoards()));
  };
  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

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
      <CreateComponent
        prop={{
          onCreate: handleCreateBoards,
          heading: "Create Board",
          label: "Board Name",
          element: "board",
        }}
      />
      <h1 style={{ color: "black", marginLeft: "2rem" }}>Boards</h1>
      {boardsData && <AllBoards boards={boardsData} />}
    </div>
  );
};

export default HomePage;
