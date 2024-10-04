const style: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
};

function Buttons({ children }: { children: React.ReactNode }) {
  return <div style={style}>{children}</div>;
}

export default Buttons;
