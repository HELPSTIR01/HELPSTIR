// src/components/Header/Header.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderProps } from "@/types/HeaderProps.types";
import "./Header.scss";

const Header: React.FC<HeaderProps> = ({ className = "", hide = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/volunteering", label: "Volunteering" },
    { href: "/blog", label: "Blog" },
    { href: "/about-us", label: "About us" },
    { href: "/career", label: "Career" },
  ];

  return (
    <header className={`header ${className}`}>
      <div className="header__container">
        <div className="header__content">
          <Link href="/" className="header__logo">
            <Image
              src="/images/logo.svg"
              alt="Helpstir"
              width={140}
              height={40}
            />
          </Link>

          {!hide && (
            <>
              <nav
                className={`header__nav ${
                  isMenuOpen ? "header__nav--open" : ""
                }`}
              >
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="header__nav-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <button
                className={`header__mobile-toggle ${
                  isMenuOpen ? "header__mobile-toggle--open" : ""
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
