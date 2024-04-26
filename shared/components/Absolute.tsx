type AbsoluteProps = {
  children: React.ReactNode;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  style?: React.CSSProperties;
};

export function Absolute({
  children,
  top,
  left,
  right,
  bottom,
  style,
}: AbsoluteProps) {
  return (
    <div
      style={{
        position: "absolute",
        ...{ top, left, right, bottom, ...style },
      }}
    >
      {children}
    </div>
  );
}
