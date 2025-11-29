import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-raleway-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-raleway-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rifa MurgaLa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased hero`}
      >
        {children}
      </body>
    </html>
  );
}
