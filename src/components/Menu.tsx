"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";
import Cookies from "js-cookie";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const { counter } = useCartStore();

  const handleLogout = async () => {
    setLoggingOut(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setLoggingOut(false);
    setOpen(false);
    router.push(logoutUrl);
  };

  const close = () => setOpen(false);

  const navLinks = [
    { label: "Homepage", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Deals", href: "/deals" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="relative">
      {/* Hamburger / Close button */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
        className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-30 relative"
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-10"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Slide-in drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-20 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span className="font-bold text-lg tracking-wide">Menu</span>
          <button
            onClick={close}
            aria-label="Close menu"
            className="text-gray-400 hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="text-base font-medium text-gray-800 hover:text-black hover:bg-gray-50 px-3 py-3 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Cart link with live counter */}
          <Link
            href="/cart"
            onClick={close}
            className="flex items-center justify-between text-base font-medium text-gray-800 hover:text-black hover:bg-gray-50 px-3 py-3 rounded-lg transition-colors"
          >
            <span>Cart</span>
            {counter > 0 && (
              <span className="bg-yellow-400 text-gray-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {counter}
              </span>
            )}
          </Link>
        </nav>

        {/* Auth section at bottom */}
        <div className="px-6 py-6 border-t border-gray-100 flex flex-col gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                onClick={close}
                className="text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 px-3 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full text-sm font-semibold text-white bg-black hover:bg-gray-800 px-4 py-3 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={close}
              className="w-full text-sm font-semibold text-white bg-black hover:bg-gray-800 px-4 py-3 rounded-lg transition-colors text-center"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;