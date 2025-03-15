"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "@/app/components/Nav/Navbar.module.css"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <nav className={`${styles["nav-content"]} text-white bg-blue-600`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Aninex
        </Link>

        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="hover:text-gray-300">
            Favorites
            </Link>
          </li>
        </ul>

        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden mt-2 space-y-2 text-center py-3 transition-transform">
          <li>
            <Link href="/" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>
              Favorites
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
