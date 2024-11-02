import React from "react";
import Card from "@mui/joy/Card";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";

import AllCards from "./AllCards";

const AllLists = ({ lists, onDelete }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem  ",
        justifyContent: "center",
        marginTop: "4rem",
        width: "100%",
      }}
    >
      {lists.map((list, idx) => (
        <Card sx={{ width: 300, bgcolor: "#212121" }} key={idx}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography level="title-lg" sx={{ color: "White" }}>
              {list.name}
            </Typography>

            <ClearIcon
              onClick={() => onDelete(list.id)}
              sx={{ color: "White" }}
            />
          </Box>
          <AllCards listId={list.id} />
        </Card>
      ))}
    </Box>
  );
};

export default AllLists;
