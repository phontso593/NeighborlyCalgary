'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Image component
import logo from '@/assets/neighborly-black-hor.png';
import { Share2, LogOut } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, loading } = useAuth();
  const auth = getAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Failed to log out", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="bg-[#0404e2] text-white p-4 flex justify-between items-center w-full">
      <Link href="/" className="flex items-center">
      {/* This Image component now has its import */}
      <Image src={logo} alt="Neighborly Logo" width={200} height={300} className="h-12 w-auto" />
      </Link>
      <nav className="flex items-center space-x-2">
        {loading ? (
          <div className="px-3 py-2 text-sm font-medium">Loading...</div>
        ) : user ? (
          <>
            <Link href="/login-user" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
              Dashboard
            </Link>
            <Link href="/donate" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
              Donate
            </Link>
            <Link href="/request" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
              Request
            </Link>
            <button onClick={handleLogout} className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
              <LogOut size={16} className="mr-1" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
              Login
            </Link>
            <Link href="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4040fb] transition-colors">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
