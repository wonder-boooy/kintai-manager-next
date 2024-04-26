import { useState } from "react";

type StyleProps = {
  isHover: boolean;
  disabled: boolean;
};

type ButtonProps = {
  children: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
};

const buildStyle = ({ isHover, disabled }: StyleProps) => ({
  fontSize: 24,
  textWrap: "nowrap" as const,
  padding: "15px 20px",
  border: "none",
  borderRadius: 5,
  transition: "all 0.2s ease",
  color: disabled ? "#c1c1c1" : "#717171",
  cursor: disabled ? "not-allowed" : "pointer",
  backgroundColor: disabled ? "rgba(255, 255, 255, 0.2)" : "#fff",
  transform: !disabled && isHover ? "translateY(-5px)" : "none",
  boxShadow:
    !disabled && isHover
      ? "0 5px 10px rgba(0, 0, 0, 0.3)"
      : "0 0 10px rgba(0, 0, 0, 0.2)",
});

export function Button({
  children,
  onClick,
  disabled = true,
  style = {},
}: ButtonProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const onMouseOver = () => (disabled ? null : setIsHover(true));
  const onMouseOut = () => setIsHover(false);
  const onMouseDown = () => (disabled ? null : setIsHover(false));
  const onMouseUp = () => setIsHover(true);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...buildStyle({ isHover, disabled }), ...style }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </button>
  );
}
