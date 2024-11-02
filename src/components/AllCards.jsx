import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

import CardItem from "./CardItem";
import CardForm from "./CardForm";
import CheckList from "./CheckList";

import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const {
  VITE_API_KEY: API_KEY,
  VITE_TOKEN: TOKEN,
  VITE_BASE_URL: BASE_URL,
} = import.meta.env;

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

  const fetchCards = async () => {
    try {
      let response = await axios.get(
        `${BASE_URL}/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`
      );
      setCardsName(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCards(listId);
  }, []);

  const createCard = async () => {
    try {
      await axios.post(
        `${BASE_URL}/cards?idList=${listId}&name=${cardName}&key=${API_KEY}&token=${TOKEN}`
      );
      setIsRunning(false);
      setCardName("");
      fetchCards();
    } catch (error) {
      setError(error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/cards/${id}?key=${API_KEY}&token=${TOKEN}`
      );
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
