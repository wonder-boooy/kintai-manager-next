import { Button } from "@/shared/components/Button";
import { db } from "@/shared/utils/db";

const allDeleteButtonStyle = {
  position: "absolute",
  background: "rgba(0, 0, 0, 0.5)",
  fontSize: 18,
  color: "#fff",
  bottom: 50,
  right: 50,
} as const;

const allDelete = () => {
  db.works.clear();
  db.breaks.clear();
};

export function AllDeleteButton() {
  return (
    <Button onClick={allDelete} style={allDeleteButtonStyle} disabled={false}>
      全削除
    </Button>
  );
}
