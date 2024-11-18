
import { Box, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CardForm = ({ cardName, onChange, onAdd, onClose }) => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <TextField
      id="outlined-basic"
      label="Card Name"
      variant="outlined"
      value={cardName}
      sx={{
        bgcolor: "white",
        color: "#212121",
        marginTop: "1rem",
        borderRadius: "0.5rem",
      }}
      onChange={onChange}
    />
    <Box sx={{ display: "flex" }}>
      <Button
        variant="contained"
        sx={{ border: "2px solid black", bgcolor: "#1769aa" }}
        onClick={onAdd}
      >
        Add
      </Button>
      <CloseIcon fontSize="large" onClick={onClose} sx={{ color: "white" }} />
    </Box>
  </Box>
);

export default CardForm;
