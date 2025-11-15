'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll करने पर Header का Background काला हो जाएगा
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full px-4 py-4 transition-all duration-500 lg:px-10 lg:py-6 ${
        isScrolled ? 'bg-background/95 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center space-x-2 md:space-x-10">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary cursor-pointer uppercase tracking-widest">
          StreamFlix
        </h1>

        {/* Navigation Links */}
        <ul className="hidden space-x-6 md:flex text-sm font-light text-gray-300">
          <li className="cursor-pointer hover:text-white transition">Home</li>
          <li className="cursor-pointer hover:text-white transition">TV Shows</li>
          <li className="cursor-pointer hover:text-white transition">Movies</li>
          <li className="cursor-pointer hover:text-white transition">New & Popular</li>
        </ul>
      </div>

      {/* Right Side Icons (Optional) */}
      <div className="flex items-center space-x-4 font-light text-sm absolute right-4 top-4 lg:right-10 lg:top-6">
        <button className="hidden sm:inline hover:text-white">Search</button>
        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center font-bold">
           U
        </div>
      </div>
    </header>
  );
}