const style: React.CSSProperties = {
  position: "relative",
  textAlign: "center",
  maxWidth: "90vw",
  padding: 30,
  borderRadius: 10,
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
};

type ContainerProps = {
  children: React.ReactNode | React.ReactNode[];
};

function Container({ children }: ContainerProps) {
  return <div style={style}>{children}</div>;
}

export default Container;
