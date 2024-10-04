import { FaAlignJustify } from "react-icons/fa6";

const style: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  cursor: "pointer",
  width: 80,
  height: 80,
};

export function MenuButton() {
  return (
    <div style={style}>
      <FaAlignJustify size={30} />
    </div>
  );
}
