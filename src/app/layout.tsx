import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Callmaker24 - Marketing Automation & CRM Platform",
  description: "Full-featured platform with Email/SMS Marketing, AI Chatbot, IVR, and Customer CRM",
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
