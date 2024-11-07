import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

const SingleBoard = ({ prop }) => {
  const { id, name } = prop;
  return (
    <>
      <Link to={`/boards/${id}`}>
        <Card
          key={id}
          className="cards"
          sx={{
            width: "18rem",
            height: "9rem",
            border: "10px solid gray",
            borderRadius: "1rem",
            fontSize: "2.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontStyle: "italic",
            bgcolor: "white",
            fontWeight: "bold",
          }}
        >
          {name}
        </Card>
      </Link>
    </>
  );
};

export default SingleBoard;
