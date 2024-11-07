import React, { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";

function CreateComponent({ prop }) {
  const { onCreate, heading, label, element, checklist, checkItem } = prop;

  const [open, setOpen] = React.useState(false);
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState(null);
  const [opensnake, setOpensnake] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    if (boardName) {
      onCreate(boardName);
      setOpensnake(true);
      setBoardName("");
      handleClose();
    } else {
      setError("Error in new Board Create", error);
    }
  };
  const handleClosebar = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setOpensnake(false);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-End",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{
            bgcolor: checkItem ? "#1769aa" : "#212121",
            width: checklist ? "7.5rem" : "10rem",
            height: checklist ? "2rem" : "3rem",
            color: checkItem ? "white" : "#f5f5f5",
            fontWeight: !checklist ? "bold" : "",
            fontSize: "0.8rem",
            display: "block",
            marginTop: checklist ? "0rem" : "4rem",
            marginRight: "auto",
            marginLeft: checklist ? "0rem" : "3rem",
          }}
        >
          {heading}
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle
          id="alert-dialog-title"
          variant="h5"
          sx={{ fontSize: "30px", fontWeight: "bold", color: "#212121" }}
        >
          {label}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To create a new {element}, please enter its name here.
          </DialogContentText>
        </DialogContent>
        <TextField
          id="standard-basic"
          label={`${label}`}
          variant="standard"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          sx={{
            padding: "20px",
          }}
          InputLabelProps={{
            sx: {
              fontWeight: "bold",
              padding: "20px",
              "&.Mui-focused": {
                color: "#424242",
              },
            },
          }}
        />
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ fontWeight: "bold", color: "#424242" }}
          >
            Cancel
          </Button>

          {/* snakebar */}
          <div>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ bgcolor: "#1769aa", width: "5rem", fontWeight: "bold" }}
            >
              Create
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={opensnake}
        autoHideDuration={6000}
        onClose={handleClosebar}
      >
        <Alert
          onClose={handleClosebar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {element} created sucessfully
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default CreateComponent;
