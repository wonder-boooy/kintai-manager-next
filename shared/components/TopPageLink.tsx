import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import Link from "next/link";
import { FaCircleArrowRight } from "react-icons/fa6";

const topPageLinkStyle = {
  color: "#fff",
  fontSize: 18,
  background: "rgba(255,255,255,0.2)",
} as const;

export function TopPageLink() {
  return (
    <Link href="/">
      <Button disabled={false} style={topPageLinkStyle}>
        <Flex align="center">
          Top
          <FaCircleArrowRight />
        </Flex>
      </Button>
    </Link>
  );
}
