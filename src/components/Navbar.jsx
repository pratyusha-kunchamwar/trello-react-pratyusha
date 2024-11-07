import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: "#212121" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Trello
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
