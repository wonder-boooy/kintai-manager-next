type MarginProps = {
  margin?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  children?: React.ReactNode;
};

export function Margin(props: MarginProps) {
  const { children, ...style } = props;
  return <div style={style}>{children}</div>;
}
