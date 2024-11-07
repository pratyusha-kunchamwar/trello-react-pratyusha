
import React from "react";
import { Box, Button } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const CardItem = ({ card, onOpen, onDelete }) => (
  <Box
    className="items"
    key={card.id}
    sx={{
      display: "flex",
      alignItems: "center",
      flex: "1",
      bgcolor: "white",
      marginTop: "1rem",
      height: "3rem",
      borderRadius: "0.5rem",
    }}
  >
    <Button
      onClick={() => onOpen(card)}
      sx={{
        width: { xs: "200px", sm: "300px" },
        height: "35px",
        color: "#212121",
        textAlign: "left",
        justifyContent: "flex-start",
        fontSize: "1.2rem",
      }}
    >
      {card.name}
    </Button>
    <DeleteIcon fontSize="large" onClick={() => onDelete(card.id)} />
  </Box>
);

export default CardItem;
