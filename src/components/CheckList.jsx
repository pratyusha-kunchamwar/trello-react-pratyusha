import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CheckedItems from "./CheckedItems";
import CreateComponent from "./CreateComponent";
import {
  fetchCheckLists,
  createCheckLists,
  deleteChecklists,
} from "../features/checkListSlice";
import Loader from "./Loader";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, Modal } from "@mui/material";

const CheckList = ({ open, handleClose, selectedCard }) => {
  const { isLoading, checkListsData } = useSelector(
    (state) => state.checklists
  );
  const dispatch = useDispatch();


  //Api calls
  useEffect(() => {
    if (selectedCard.id) {
      console.log("enter");
      console.log(selectedCard.id);
      dispatch(fetchCheckLists(selectedCard.id));
    }
  }, [selectedCard.id]);
  const createChecklist = (checkListName) => {
    console.log(checkListName);
    dispatch(createCheckLists({ checkListName, cardId: selectedCard.id })).then(
      () => {
        dispatch(fetchCheckLists(selectedCard.id));
      }
    );
  };
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: "300px",
            }}
          >
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
                {Array.isArray(checkListInfo) && checkListInfo.length > 0 ? (
                  checkListInfo.map((checklist) =>
                    checklist && checklist.name ? (
                      <Box
                        key={checklist.id}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
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
                      </Box>
                    ) : null
                  )
                ) : (
                  <Typography>No checklist items found</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Modal>
  );
};

export default CheckList;
