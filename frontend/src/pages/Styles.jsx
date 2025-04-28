const boxStyle = {
  width: "200px",
  height: "120px",
  backgroundColor: "#B82132 ",
  color: "#fff",
  fontSize: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",
  cursor: "pointer",
  margin: "30px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s ease-in-out",
  textDecoration: "none",
  textAlign: "center",
};

const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F6DED8  ",
};

const headingStyle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "black",
  marginBottom: "40px",
  textAlign: "center",
  fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  letterSpacing: "1px",
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};

const boxesWrapperStyle = {
  display: "flex",
  flexWrap: "wrap", // responsive for mobile
  justifyContent: "center",
  gap: "20px",
};

export { boxStyle, boxesWrapperStyle, headingStyle, containerStyle };
