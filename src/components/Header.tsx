'use client';
import React from "react";
import Link from "next/link";
import Image from 'next/image';
import logo from '@/assets/neighborly-black-hor.png';

const Header = () => {
  return (
    <header className="bg-[#0404e2] text-white p-4 flex justify-between items-center w-full">
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="Neighborly Logo" width={50} height={50} className="h-12 w-auto" />
      </Link>
      <nav className="flex items-center space-x-2">
        <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
          Home
        </Link>
        <Link href="/donate" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
          Donate
        </Link>
        <Link href="/request" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
          Request
        </Link>
        <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
          Login
        </Link>
        <Link href="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
