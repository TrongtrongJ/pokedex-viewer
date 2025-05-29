import type { Metadata } from "next";
import { Encode_Sans, Roboto, Inter } from "next/font/google";
import "./scss/main.scss";

const encodeSans = Encode_Sans({
  variable: "--font-encode-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Pokedex viewer by TwentyIdea",
  description: "Pokedex viewer by TwentyIdea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${encodeSans.variable} ${roboto.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
