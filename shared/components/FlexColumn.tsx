type StyleProps = {
  align?: "center" | "start" | "end" | "flex-start" | "flex-end";
  justify?:
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gap?: number;
};

type FlexColumnProps = StyleProps & {
  children: React.ReactNode;
};

const style = ({ align, justify, gap = 10 }: StyleProps) => {
  return {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: align,
    justifyContent: justify,
    gap,
  };
};

function FlexColumn({
  children,
  align = "center",
  justify = "center",
  gap = 10,
}: FlexColumnProps) {
  return <div style={style({ align, justify, gap })}>{children}</div>;
}

export default FlexColumn;
