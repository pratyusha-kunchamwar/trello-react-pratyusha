import SingleBoard from "../components/SingleBoard";

const AllBoards = ({ boards }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "4rem",
        margin: " 0 6rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {boards.map((item) => (
        <SingleBoard key={item.id} prop={{ id: item.id, name: item.name }} />
      ))}
    </div>
  );
};

export default AllBoards;
