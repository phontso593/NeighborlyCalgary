
'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/whitePrancheta 12.png';
import { LogOut, PackagePlus, Menu, X, MessageSquare } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, loading } = useAuth();
  const auth = getAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error("Failed to log out", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const loggedInLinks = (
    <>
      <Link href="/how-it-works" className="nav-link" onClick={closeMenu}>How It Works</Link>
      <Link href="/browse" className="nav-link" onClick={closeMenu}>Browse</Link>
      <Link href="/about" className="nav-link" onClick={closeMenu}>About</Link>
      <Link href="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
      <Link href="/profile" className="nav-link" onClick={closeMenu}>Profile</Link>
      <Link href="/donate" className="donate-btn" onClick={closeMenu}><PackagePlus size={16} className="mr-2" />Donate</Link>
      <button onClick={handleLogout} className="logout-btn"><LogOut size={16} className="mr-1" />Logout</button>
    </>
  );

  const loggedOutLinks = (
     <>
      <Link href="/how-it-works" className="nav-link" onClick={closeMenu}>How It Works</Link>
      <Link href="/browse" className="nav-link" onClick={closeMenu}>Browse</Link>
      <Link href="/about" className="nav-link" onClick={closeMenu}>About</Link>
      <Link href="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
      <Link href="/login" className="login-btn" onClick={closeMenu}><LogOut size={16} className="mr-2" />Login</Link>
      <Link href="/register" className="signup-btn" onClick={closeMenu}><PackagePlus size={16} className="mr-2" />Sign Up</Link>
    </>
  );

  const mobileLoggedInLinks = (
    <>
      <Link href="/how-it-works" className="mobile-nav-link" onClick={closeMenu}>How It Works</Link>
      <Link href="/browse" className="mobile-nav-link" onClick={closeMenu}>Browse</Link>
      <Link href="/about" className="mobile-nav-link" onClick={closeMenu}>About</Link>
      <Link href="/contact" className="mobile-nav-link" onClick={closeMenu}>Contact</Link>
      <Link href="/profile" className="mobile-nav-link" onClick={closeMenu}>Profile</Link>
      <Link href="/donate" className="mobile-nav-link bg-sky-500" onClick={closeMenu}>Donate</Link>
      <button onClick={handleLogout} className="mobile-nav-link w-full text-left bg-red-500 mt-2">Logout</button>
    </>
  );

  const mobileLoggedOutLinks = (
    <>
      <Link href="/how-it-works" className="mobile-nav-link" onClick={closeMenu}>How It Works</Link>
      <Link href="/browse" className="mobile-nav-link" onClick={closeMenu}>Browse</Link>
      <Link href="/about" className="mobile-nav-link" onClick={closeMenu}>About</Link>
      <Link href="/contact" className="mobile-nav-link" onClick={closeMenu}>Contact</Link>
      <Link href="/login" className="mobile-nav-link bg-green-500" onClick={closeMenu}>Login</Link>
      <Link href="/register" className="mobile-nav-link bg-blue-700" onClick={closeMenu}>Sign Up</Link>
    </>
  );

  return (
    <header className="bg-[#0404e2] text-white p-4 flex justify-between items-center w-full shadow-md sticky top-0 z-50">
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="Neighborly Logo" width={50} height={50} className="h-12 w-auto" />
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-2">
        {loading ? (
          <div className="px-3 py-2 text-sm font-medium">Loading...</div>
        ) : user ? (
          loggedInLinks
        ) : (
          loggedOutLinks
        )}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0404e2] bg-opacity-95 p-4 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {loading ? (
              <div className="px-3 py-2 text-sm font-medium text-center">Loading...</div>
            ) : user ? (
              mobileLoggedInLinks
            ) : (
              mobileLoggedOutLinks
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
