import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CheckedItems from "./CheckedItems";
import CreateComponent from "./CreateComponent";
import {
  fetchCheckLists,
  createCheckLists,
  deleteChecklists,
} from "../features/checkListSlice";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, Modal } from "@mui/material";

const CheckList = ({ open, handleClose, selectedCard }) => {
  const { isLoading, checkListsData, error } = useSelector(
    (state) => state.checklists
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCard?.id) {
      dispatch(fetchCheckLists(selectedCard.id));
    }
  }, [dispatch, selectedCard]);
  //create
  const createChecklist = (checkListName) => {
    dispatch(createCheckLists({ checkListName, cardId: selectedCard.id }));
  };
  //delete
  const handleDeleteChecklist = (checklistId) => {
    dispatch(deleteChecklists(checklistId)).then(() => {
      dispatch(fetchCheckLists(selectedCard.id));
    });
  };

  let checkListInfo = checkListsData[selectedCard.id] || [];
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
            <CreateComponent
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
            {checkListInfo.map((checklist) => (
              <>
                <Box
                  key={checklist.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">{checklist.name}</Typography>
                  <DeleteIcon
                    onClick={() => handleDeleteChecklist(checklist.id)}
                  />
                </Box>
                <CheckedItems
                  checkListId={checklist.id}
                  cardId={selectedCard.id}
                  sx={{ border: "2px solid black" }}
                />
              </>
            ))}
          </Box>
          {checkListsData.length === 0 && "No checklist items found"}
        </Box>
      </Box>
    </Modal>
  );
};

export default CheckList;
