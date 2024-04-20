const style: React.CSSProperties = {
  textAlign: "center",
  padding: 40,
  borderRadius: 10,
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
};

function Container({ children }: { children: React.ReactNode }) {
  return <div style={style}>{children}</div>;
}

export default Container;
