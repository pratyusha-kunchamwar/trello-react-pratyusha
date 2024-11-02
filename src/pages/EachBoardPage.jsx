import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import CreateBoardOrCard from "../components/CreateBoardOrCard";
import AllLists from "../components/AllLists";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

const EachBoardPage = () => {
  const param = useParams();
  const [allLists, setAllLists] = useState([]);
  const [error, setError] = useState(null);

  // Fetch lists
  const fetchAllLists = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/boards/${param.id}/lists?key=${API_KEY}&token=${TOKEN}`
      );

      setAllLists(response.data);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchAllLists();
  }, []);
  // Create a list
  const CreateList = async (boardName) => {
    try {
      await axios.post(
        `${BASE_URL}/lists?name=${boardName}&idBoard=${param.id}&key=${API_KEY}&token=${TOKEN}`
      );
      fetchAllLists();
    } catch (error) {
      setError(error);
    }
  };
  // Delete the list
  const DeleteTheLists = async (listId) => {
    try {
      await axios.put(
        `${BASE_URL}/lists/${listId}/closed?value=true&key=${API_KEY}&token=${TOKEN}`
      );
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
      marginTop:"3rem"
    }}
    >
      <CreateBoardOrCard
        prop={{
          onCreate: CreateList,
          heading: "Create List",
          label: "List",
          element: "list",
        }}
      />
      <AllLists lists={allLists} onDelete={DeleteTheLists} />
    </div>
  );
};

export default EachBoardPage;
