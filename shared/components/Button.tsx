const buttonStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  height: "8rem",
  width: "8rem",
  borderRadius: "50%",
  color: "#808080",
  background: "#fff",
  border: "3px solid #5e7cff",
  cursor: "pointer",
};

export function Button({ children }: { children: React.ReactNode | string }) {
  return <button style={buttonStyle}>{children}</button>;
}
