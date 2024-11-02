import React, { useEffect, useState } from "react";
import axios from "axios";

import CreateBoardOrCard from "./CreateBoardOrCard";

import { Box, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import Checkbox from "@mui/material/Checkbox";


const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

const CheckedItems = ({ listId, cardId }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch items
  const fetchCheckedItems = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/checklists/${listId}/checkItems?key=${API_KEY}&token=${TOKEN}`
      );
      const items = response.data;
      setCheckedItems(items);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCheckedItems();
  }, []);

  // Create items
  const createCheckedItems = async (listName) => {
    try {
      await axios.post(
        `${BASE_URL}/checklists/${listId}/checkItems?name=${listName}&key=${API_KEY}&token=${TOKEN}`
      );
      fetchCheckedItems();
    } catch (error) {
      setError(error);
    }
  };
  // Delete items
  const deleteCheckedItems = async (itemId) => {
    try {
      await axios.delete(
        `${BASE_URL}/checklists/${listId}/checkItems/${itemId}?key=${API_KEY}&token=${TOKEN}`
      );
      fetchCheckedItems();
    } catch (error) {
      setError(error);
    }
  };
  //update items
  const updateCheckItems = async (itemId) => {
    if (!cardId) {
      setError("no card id");
      return;
    }
    try {
      const item = checkedItems.find((item) => item.id === itemId);
      const state = item.state === "complete" ? "incomplete" : "complete";

      await axios.put(
        `${BASE_URL}/cards/${cardId}/checkItem/${itemId}?state=${state}&key=${API_KEY}&token=${TOKEN}`
      );
      setCheckedItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, state: state } : item
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Box>
        <Box>
          {checkedItems.map((list) => (
            <Box
              key={list.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  inputProps={{ "aria-label": "controlled" }}
                  checked={list.state === "complete"}
                  onChange={() => updateCheckItems(list.id)}
                />
                <Typography variant="body1">{list.name}</Typography>
              </Box>
              <RemoveIcon onClick={() => deleteCheckedItems(list.id)} />
            </Box>
          ))}
        </Box>
        <CreateBoardOrCard
          prop={{
            onCreate: createCheckedItems,
            heading: "CheckItems",
            label: "CheckItems Name",
            element: "Checkitems",
            checklist: "true",
            checkItem: "true",
          }}
        />
      </Box>
    </>
  );
};

export default CheckedItems;
