import { Button } from "@/shared/components/Button";
import { db } from "@/shared/utils/db";

const clearAllButtonStyle = {
  position: "absolute",
  background: "rgba(0, 0, 0, 0.5)",
  fontSize: 18,
  color: "#fff",
  bottom: 50,
  right: 50,
} as const;

const clearAll = () => {
  db.works.clear();
  db.breaks.clear();
};

export function ClearAllButton() {
  return (
    <Button onClick={clearAll} style={clearAllButtonStyle} disabled={false}>
      Clear All
    </Button>
  );
}
