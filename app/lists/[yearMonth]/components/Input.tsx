type InputProps = {
  type?: "text" | "number";
  width?: number;
  textAlign?: "left" | "center" | "right";
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
};

export function Input({
  type = "text",
  width = 70,
  textAlign = "center",
  value,
  defaultValue,
  disabled = false,
  readonly = false,
}: InputProps) {
  return (
    <input
      type={type}
      style={{ width, textAlign }}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readonly}
    />
  );
}
