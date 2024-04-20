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

type FlexProps = StyleProps & {
  children: React.ReactNode;
};

const style = ({ align, justify, gap = 10 }: StyleProps) => {
  return {
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    gap,
  };
};

function Flex({
  children,
  align = "center",
  justify = "center",
  gap = 10,
}: FlexProps) {
  return <div style={style({ align, justify, gap })}>{children}</div>;
}

export default Flex;
