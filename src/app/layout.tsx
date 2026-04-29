import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scaler Persona Chat — Talk to Anshuman, Abhimanyu & Kshitij",
  description:
    "Have real conversations with Scaler Academy's founders and top instructors. Get career advice, learn DSA, and explore tech entrepreneurship through AI-powered persona chatbots.",
  keywords: ["Scaler", "InterviewBit", "AI Chatbot", "Anshuman Singh", "Abhimanyu Saxena", "Kshitij Mishra"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
