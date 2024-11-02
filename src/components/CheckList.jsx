import axios from "axios";
import { useEffect, useState } from "react";

import CheckedItems from "./CheckedItems";
import CreateBoardOrCard from "./CreateBoardOrCard";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, Modal } from "@mui/material";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

const CheckList = ({ open, handleClose, selectedCard }) => {
  const [checklist, setChecklist] = useState([]);
  const [error, setError] = useState(null);

  // fetch all checklist-items
  const fetchChecklists = async () => {
    try {
      const responce = await axios.get(
        `${BASE_URL}/cards/${selectedCard.id}/checklists?key=${API_KEY}&token=${TOKEN}`
      );
      setChecklist(responce.data);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    if (selectedCard?.id) {
      fetchChecklists(selectedCard.id);
    }
  }, [selectedCard]);

  //to create list
  const createChecklist = async (name) => {
    try {
      await axios.post(
        `${BASE_URL}/cards/${selectedCard.id}/checklists?name=${name}&key=${API_KEY}&token=${TOKEN}`
      );
      fetchChecklists();
    } catch (error) {
      setError(error);
    }
  };
  //to delete the list
const deleteChecklist = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/checklists/${id}?key=${API_KEY}&token=${TOKEN}`
      );
      fetchChecklists();
    } catch (error) {
      setError(error);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: "300px",
        }}
      >
        <Typography variant="h6" component="h2">
          {selectedCard ? selectedCard.name : ""}
        </Typography>
        {/* for checklist data */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Box sx={{ Margin: "10rem", Padding: "10rem" }}>
            <CreateBoardOrCard
              prop={{
                onCreate: createChecklist,
                heading: "checklist",
                label: "checklist",
                element: "checklist",
                checklist: "true",
              }}
            />
          </Box>

          <Box
            sx={{
              maxHeight: "25rem",
              overflowY: "auto",
              paddingRight: "0.5rem",
            }}
          >
            {checklist.map((list) => (
              <>
                <Box
                  key={list.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">{list.name}</Typography>
                  <DeleteIcon onClick={() => deleteChecklist(list.id)} />
                </Box>
                <CheckedItems
                  listId={list.id}
                  cardId={selectedCard.id}
                  sx={{ border: "2px solid black" }}
                />
              </>
            ))}
          </Box>
          {checklist.length === 0 && "No checklist items found"}
        </Box>
      </Box>
    </Modal>
  );
};

export default CheckList;
