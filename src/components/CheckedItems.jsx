import React, { useEffect, useState } from "react";

import CreateBoardOrCard from "./CreateBoardOrCard";
import {
  getCheckItems,
  addCheckItems,
  deleteCheckItems,
  updateCheckItem,
} from "../services/checkItems";

import { Box, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import Checkbox from "@mui/material/Checkbox";

const CheckedItems = ({ listId, cardId }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch items
  const fetchCheckedItems = async () => {
    try {
      const response = await getCheckItems(listId);
      setCheckedItems(response);
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
      await addCheckItems(listName, listId);
      fetchCheckedItems();
    } catch (error) {
      setError(error);
    }
  };
  // Delete items
  const deleteCheckedItems = async (itemId) => {
    try {
      await deleteCheckItems(listId, itemId);
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

      await updateCheckItem(cardId, itemId, state);
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
