"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaInstagram, FaSoundcloud, FaSpotify } from "react-icons/fa";

const navItems = [
  { href: "/music", label: "Music" },
  { href: "/tour", label: "Tour" },
  // { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/myselfincludedmusic", 
    icon: FaInstagram,
    color: "#E4405F"
  },
  { 
    name: "SoundCloud", 
    href: "https://soundcloud.com/myself-included", 
    icon: FaSoundcloud,
    color: "#FF5500"
  },
  { 
    name: "Spotify", 
    href: "https://open.spotify.com/artist/09K1NtNYl5AQDMNA5pTgJ5", 
    icon: FaSpotify,
    color: "#1DB954"
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-dark-slate/95 backdrop-blur supports-[backdrop-filter]:bg-dark-slate/90">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-display text-xl font-light relative inline-block">
              <span className="bg-gradient-to-r from-white via-purple-400/60 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer-header">
                ᗰYᔕEᒪᖴ IᑎᑕᒪᑌᗪEᗪ
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-ui font-light uppercase tracking-[0.5px] text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden z-[80] relative text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>
        </div>
      </header>

      {/* Mobile Navigation - Full Screen Overlay (outside header) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60] md:hidden"
            style={{ backgroundColor: 'rgba(88, 28, 135, 0.95)' }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Close Button - Fixed Position */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="fixed top-4 right-4 z-[80] md:hidden p-2 text-white hover:text-white/80 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          {/* Menu */}
          <nav className="fixed inset-0 z-[70] md:hidden flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-md mx-auto px-8 flex flex-col gap-6 pointer-events-auto">
              {/* Artist Name */}
              <div className="flex flex-col items-center gap-3 pb-3">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white text-center leading-tight hover:text-white/80 transition-colors"
                >
                  ᗰYᔕEᒪᖴ IᑎᑕᒪᑌᗪEᗪ
                </Link>
                <div className="w-full h-px bg-white/30"></div>
              </div>
              
              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xl font-ui font-medium uppercase tracking-[0.5px] text-white transition-colors hover:text-white/80 py-6 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Divider */}
              <div className="w-full h-px bg-white/30"></div>
              
              {/* Social Links */}
              <div className="flex justify-center gap-6 pt-2">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                      aria-label={link.name}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <IconComponent size={35} style={{ color: link.color }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

