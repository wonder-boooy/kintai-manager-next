import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
const scp = Source_Code_Pro({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kintai Manager",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={scp.className}>{children}</body>
    </html>
  );
}
