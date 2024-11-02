import React, { useEffect, useState } from "react";
import CreateBoardOrCard from "./CreateBoardOrCard";
import { Box, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

const CheckedItems = ({ listId }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [error, setError] = useState(null);
  const [checkedStates, setCheckedStates] = useState({});

  // Fetch items
  const fetchCheckedItems = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/checklists/${listId}/checkItems?key=${API_KEY}&token=${TOKEN}`
      );
      const items = response.data;
      setCheckedItems(items);
      const initialCheckedStates = items.reduce((acc, item) => {
        acc[item.id] = item.state === "complete";
        return acc;
      }, {});
      setCheckedStates(initialCheckedStates);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCheckedItems();
  }, []);

  // Toggle checked state for individual items
  const handleChange = (itemId) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };
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
                  checked={checkedStates[list.id] || false}
                  onChange={() => handleChange(list.id)}
                  inputProps={{ "aria-label": "controlled" }}
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
