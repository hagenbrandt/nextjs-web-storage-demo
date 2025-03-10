"use client";
import React from "react";
import Link from "next/link";
import { type NavigationItem } from "@/app/sharedTypes";

export const NavigationBar = ({
  navItems,
  linkToHome = true,
}: {
  navItems: NavigationItem[];
  linkToHome?: boolean;
}) => (
  <nav className="fixed top-0 left-0 right-0 bg-gray-800 shadow-md p-4 flex justify-between items-center z-50">
    <div className="flex space-x-4">
      {linkToHome ? (
        <Link className="text-blue-400 hover:underline" href="/">
          Home
        </Link>
      ) : null}
      {navItems.map((item) => (
        <Link
          key={item.name}
          className="text-blue-400 hover:underline"
          href={item.url}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </nav>
);
