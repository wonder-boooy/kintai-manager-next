import { useState } from "react";

const style: React.CSSProperties = {
  fontSize: 24,
  textWrap: "nowrap",
  padding: "15px 30px",
  border: "none",
  borderRadius: 5,
  backgroundColor: "#fff",
  color: "#667eea",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  transition: "all 0.2s ease",
};

const hoverStyle: React.CSSProperties = {
  ...style,
  transform: "translateY(-5px)",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
};

export function Button({ children }: { children: React.ReactNode | string }) {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <button
      style={isHover ? hoverStyle : style}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onMouseDown={() => setIsHover(false)}
      onMouseUp={() => setIsHover(true)}
    >
      {children}
    </button>
  );
}
