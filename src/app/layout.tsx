import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Callmaker24 - Marketing & CRM Platform",
  description: "Full-featured Email & SMS Marketing, AI Chatbot, IVR, and Customer CRM platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
