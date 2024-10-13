"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4  flex justify-between items-center relative">
      {/* Logo on the left */}
      <div className="text-2xl font-mono font-bold">
        <Link href="/">Colook.</Link>
      </div>
    </nav>
  );
}
