import { useNavigate } from "react-router-dom";

export default function ErrorPage({ message = "" }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        color: "#333",
        padding: "20px",
        marginLeft: "33rem",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "20px", color: "#000" }}>
        404
      </h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#000" }}>
        Page Not Found
        {message && <span>: {message}</span>}
      </h2>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
