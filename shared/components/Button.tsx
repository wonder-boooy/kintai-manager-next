const buttonStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  height: "4rem",
  width: "8rem",
  borderRadius: "8px",
  background: "#ccc",
  color: "#333",
  border: "none",
  cursor: "pointer",
};

export function Button({ children }: { children: React.ReactNode | string }) {
  return <button style={buttonStyle}>{children}</button>;
}
