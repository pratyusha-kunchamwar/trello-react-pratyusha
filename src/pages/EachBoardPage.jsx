import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import CreateBoardOrCard from "../components/CreateBoardOrCard";
import AllLists from "../components/AllLists";
import { getLists, addLists, deleteLists } from "../services/lists";

const EachBoardPage = () => {
  const param = useParams();
  const [allLists, setAllLists] = useState([]);
  const [error, setError] = useState(null);

  // Fetch lists
  const fetchAllLists = async () => {
    try {
      const response = await getLists(param.id);
      setAllLists(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchAllLists();
  }, []);

  // Create a list
  const CreateList = async (listName) => {
    try {
      await addLists(param.id, listName);
      fetchAllLists();
    } catch (error) {
      setError(error);
    }
  };
  
  // Delete the list
  const DeleteTheLists = async (listId) => {
    try {
      await deleteLists(listId);
      fetchAllLists();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#eeeeee",
        minHeight: "100vh",
        width: "100vw",
        overflow: "auto",
        marginTop: "3rem",
      }}
    >
      <CreateBoardOrCard
        prop={{
          onCreate: CreateList,
          heading: "Create List",
          label: "List",
          element: "list",
          checklist: false,
          checkItem: false,
        }}
      />
      <AllLists lists={allLists} onDelete={DeleteTheLists} />
    </div>
  );
};

export default EachBoardPage;
