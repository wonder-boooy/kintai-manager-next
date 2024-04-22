import { useMediaQuery } from "react-responsive";

export const smWidth: number = 450;
export const mdWidth: number = 640;
export const lgWidth: number = 1024;

export function WithinSmall({ children }: { children: React.ReactNode }) {
  const withinSmall = useMediaQuery({ query: `(max-width: ${smWidth}px)` });
  if (withinSmall) return children;

  return null;
}

export function WithinMedium({ children }: { children: React.ReactNode }) {
  const withinMedium = useMediaQuery({ query: `(max-width: ${mdWidth}px)` });
  if (withinMedium) return children;

  return null;
}

export function WithinLarge({ children }: { children: React.ReactNode }) {
  const withinLarge = useMediaQuery({ query: `(max-width: ${lgWidth}px)` });
  if (withinLarge) return children;

  return null;
}

export function OverLarge({ children }: { children: React.ReactNode }) {
  const overLarge = useMediaQuery({ query: `(min-width: ${lgWidth}px)` });
  if (overLarge) return children;

  return null;
}
