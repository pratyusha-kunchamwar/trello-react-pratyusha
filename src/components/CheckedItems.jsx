import React, { useEffect } from "react";
import {
  fetchCheckItems,
  createCheckItems,
  deleteCheckItems,
  updateCheckItems,
} from "../features/checkItemSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateComponent from "./CreateComponent";
import Loader from "./Loader";

import { Box, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import Checkbox from "@mui/material/Checkbox";

const CheckedItems = ({ checkListId, cardId }) => {
  const { isLoading, checkItemsData, error } = useSelector(
    (state) => state.checkItems
  );
  const dispatch = useDispatch();

  //api calls
  useEffect(() => {
    dispatch(fetchCheckItems(checkListId));
  }, [dispatch, checkListId]);

  const createCheckedItems = (checkItemName) => {
    dispatch(createCheckItems({ checkListId, checkItemName })).then(() => {
      dispatch(fetchCheckItems(checkListId));
    });
  };

  const handleDeleteCheckItem = (checkItemId) => {
    dispatch(deleteCheckItems({ checkListId, checkItemId })).then(() => {
      dispatch(fetchCheckItems(checkListId));
    });
  };
  const handleUpdateCheckItem = (checkItemId) => {
    dispatch(updateCheckItems({ cardId, checkItemId })).then(() => {
      dispatch(fetchCheckItems(checkListId));
    });
  };

  let checkItemsInfo = checkItemsData[checkListId] || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Box>
            <Box>
              {checkItemsInfo.map((checkitem) => (
                <Box
                  key={checkitem.id}
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
                      checked={checkitem.state === "complete"}
                      onChange={() => handleUpdateCheckItem(checkitem.id)}
                    />
                    <Typography variant="body1">{checkitem.name}</Typography>
                  </Box>
                  <RemoveIcon
                    onClick={() => handleDeleteCheckItem(checkitem.id)}
                  />
                </Box>
              ))}
            </Box>
            <CreateComponent
              prop={{
                onCreate: createCheckedItems,
                heading: "CheckItems",
                label: "CheckItems Name",
                element: "Checkitems",
                checklist: "true",
                checkItem: "true",
              }}
            />
          </Box>{" "}
        </>
      )}
    </>
  );
};

export default CheckedItems;
