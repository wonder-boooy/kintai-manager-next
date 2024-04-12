const buttonStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  height: "7rem",
  width: "7rem",
  borderRadius: "50%",
  color: "#808080",
  background: "#fff",
  border: "3px solid #5e7cff",
  cursor: "pointer",
};

export function Button({ children }: { children: React.ReactNode | string }) {
  return <button style={buttonStyle}>{children}</button>;
}
