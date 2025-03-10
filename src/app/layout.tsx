"use client";
import * as React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/NavigationBar";
import { type NavigationItem } from "@/app/sharedTypes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  linkToHome,
}: Readonly<{
  children: React.ReactNode;
  linkToHome?: boolean;
}>) {
  const [navData, setNavData] = React.useState<NavigationItem[] | null>(null);

  React.useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => setNavData(data))
      .catch((err) => console.error("Error fetching navigation data:", err));
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {navData ? (
          <NavigationBar linkToHome={linkToHome} navItems={navData} />
        ) : null}
        <main className="mt-12">{children}</main>
      </body>
    </html>
  );
}
