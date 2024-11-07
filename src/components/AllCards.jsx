import { useEffect, useState } from "react";
import React from "react";
import { fetchCards, createCards, deleteCards } from "../features/cardSlice";
import { useSelector, useDispatch } from "react-redux";

import CardItem from "./CardItem";
import CardForm from "./CardForm";
import CheckList from "./CheckList";

import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const AllCards = ({ listId }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [cardName, setCardName] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [open, setOpen] = useState(false);

  const { isLoadind, cardsData, error } = useSelector((state) => state.cards);
  const dispatch = useDispatch();

 
  const handleClickOpen = (card) => {
 
    setSelectedCard(card);
    setOpen(true);
  };


  const handleClickClose = () => {
    setOpen(false);
  };

  //to fetch
  useEffect(() => {
    dispatch(fetchCards(listId));
  }, [dispatch]);

  const createCard = () => {
    dispatch(createCards({ listId, cardName }));
    dispatch(fetchCards(listId));
    setSelectedCard("");
    setCardName("");
  };
  const handleDelete = (id) => {
    dispatch(deleteCards(id));
  };

  const cardsInfo = cardsData[listId] || [];
  return (
    <>
      <Box key={listId}>
        {cardsInfo.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onOpen={handleClickOpen}
            onDelete={handleDelete}
          />
        ))}
        {isRunning ? (
          <CardForm
            cardName={cardName}
            onChange={(e) => setCardName(e.target.value)}
            onAdd={createCard}
            onClose={() => setIsRunning(false)}
          />
        ) : (
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              height: "3rem",
              bgcolor: "#1769aa",
              color: "white",
              marginTop: "1rem",
              borderRadius: "0.5rem",
              fontSize: "1rem",
            }}
            startIcon={<AddIcon />}
            onClick={() => setIsRunning(true)}
          >
            Add a Card
          </Button>
        )}
        <CheckList
          open={open}
          handleClose={handleClickClose}
          selectedCard={selectedCard}
        />
      </Box>
    </>
  );
};

export default AllCards;
