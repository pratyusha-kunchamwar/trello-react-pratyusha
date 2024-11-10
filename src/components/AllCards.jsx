import { useEffect, useState } from "react";
import React from "react";

import CardItem from "./CardItem";
import CardForm from "./CardForm";
import CheckList from "./CheckList";

import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { getCards, addCards, deleteCards } from "../services/cards";

const AllCards = ({ listId }) => {
  const [cardsName, setCardsName] = useState([]);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [cardName, setCardName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState();

  const handleClickOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  //to fetch
  const fetchCards = async () => {
    try {
      let response = await getCards(listId);
      setCardsName(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCards(listId);
  }, [listId]);

  //to create
  const createCard = async () => {
    try {
      await addCards(listId, cardName);
      setIsRunning(false);
      setCardName("");
      fetchCards();
    } catch (error) {
      setError(error);
    }
  };
  //to delete
  const deleteCard = async (id) => {
    try {
      await deleteCards(id);
      fetchCards();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Box>
        {cardsName.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onOpen={handleClickOpen}
            onDelete={deleteCard}
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
