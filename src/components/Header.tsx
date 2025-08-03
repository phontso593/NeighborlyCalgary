
'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/whitePrancheta 12.png';
import { LogOut, PackagePlus, Menu, X, LogIn } from 'lucide-react'; // Added LogIn
import { useAuth } from "@/hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

// 1. Centralized navigation links
const navLinksConfig = [
    { href: "/how-it-works", label: "How It Works", show: 'always' },
    { href: "/browse", label: "Browse", show: 'always' },
    { href: "/about", label: "About", show: 'always' },
    { href: "/contact", label: "Contact", show: 'always' },
    { href: "/profile", label: "Profile", show: 'loggedIn' },
    { href: "/donate", label: "Donate", show: 'loggedIn', isButton: true, icon: <PackagePlus size={16} className="mr-2" />, className: "donate-btn", mobileClassName: "bg-sky-500" },
    { href: "/login", label: "Login", show: 'loggedOut', isButton: true, icon: <LogIn size={16} className="mr-2" />, className: "login-btn", mobileClassName: "bg-green-500" },
    { href: "/register", label: "Sign Up", show: 'loggedOut', isButton: true, icon: <PackagePlus size={16} className="mr-2" />, className: "signup-btn", mobileClassName: "bg-blue-700" },
];

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
        }
    };

    const closeMenu = () => setIsMenuOpen(false);

    // 2. Simplified rendering logic based on auth state
    const renderLinks = (isMobile = false) => {
        const linksToRender = navLinksConfig.filter(link =>
            link.show === 'always' ||
            (user && link.show === 'loggedIn') ||
            (!user && link.show === 'loggedOut')
        );

        return linksToRender.map(link => {
            let className = isMobile ? "mobile-nav-link" : "nav-link";
            if (link.isButton) {
                className = isMobile ? `${className} ${link.mobileClassName}` : link.className;
            }

            return (
                <Link key={link.href} href={link.href} className={className} onClick={closeMenu}>
                    {link.icon}{link.label}
                </Link>
            );
        });
    };

    return (
        <header className="bg-[#0404e2] text-white p-4 flex justify-between items-center w-full shadow-md sticky top-0 z-50">
            <Link href={user ? "/login-user" : "/"} className="flex items-center" onClick={closeMenu}>
                <Image src={logo} alt="Neighborly Logo" width={50} height={50} className="h-12 w-auto" priority />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
                {loading ? <div className="px-3 py-2 text-sm font-medium">Loading...</div> : renderLinks()}
                {user && !loading && (
                    <button onClick={handleLogout} className="logout-btn"><LogOut size={16} className="mr-1" />Logout</button>
                )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white focus:outline-none"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen} // 3. Accessibility improvement
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 bg-[#0404e2] bg-opacity-95 p-4 shadow-lg">
                    <nav className="flex flex-col space-y-2">
                        {loading ? <div className="text-center">Loading...</div> : renderLinks(true)}
                        {user && !loading && (
                           <button onClick={handleLogout} className="mobile-nav-link w-full text-left bg-red-500 mt-2">Logout</button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
