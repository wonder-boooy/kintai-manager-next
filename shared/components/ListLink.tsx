import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import Link from "next/link";
import { FaCircleArrowRight } from "react-icons/fa6";

const listLinkStyle = {
  color: "#fff",
  fontSize: 18,
  background: "rgba(255,255,255,0.2)",
} as const;

export function ListLink() {
  return (
    <Link href="/lists">
      <Button disabled={false} style={listLinkStyle}>
        <Flex align="center">
          List
          <FaCircleArrowRight />
        </Flex>
      </Button>
    </Link>
  );
}
