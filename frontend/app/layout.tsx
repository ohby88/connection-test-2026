import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dog Fashion Shop - AI Virtual Fitting",
  description: "Shop dog clothes with AI-powered virtual try-on",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
