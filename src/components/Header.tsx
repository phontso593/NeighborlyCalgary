'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/whitePrancheta 12.png';
import { LogOut, PackagePlus, Menu, X, LogIn, User, MessageSquare, Box, Heart } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinksConfig = [
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

    const renderLinks = (isMobile = false) => {
        const linksToRender = navLinksConfig.filter(link =>
            link.show === 'always' ||
            (user && link.show === 'loggedIn') ||
            (!user && link.show === 'loggedOut')
        );

        return linksToRender.map(link => {
            let className = isMobile ? "mobile-nav-link" : "nav-link";
            if (link.isButton) {
                // For desktop, we don't render these buttons here anymore, but leaving logic for mobile
                className = isMobile ? `${' '}${link.mobileClassName}` : link.className;
            }
             if (isMobile) {
              return (
                <Link key={link.href} href={link.href} className={className} onClick={closeMenu}>
                    <span className="flex items-center">{link.icon}{link.label}</span>
                </Link>
              )
            }

             // Render non-button links for desktop
            if(!link.isButton){
                return (
                    <Link key={link.href} href={link.href} className={className}>
                       {link.label}
                    </Link>
                );
            }
            return null;
        });
    };

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    }

    return (
        <header className="bg-[#0404e2] text-white p-4 flex justify-between items-center w-full shadow-md sticky top-0 z-50">
            <Link href={user ? "/login-user" : "/"} className="flex items-center" onClick={closeMenu}>
                <Image src={logo} alt="Neighborly Logo" width={50} height={50} className="h-12 w-auto" priority />
            </Link>

            {/* Combined Desktop Navigation and Profile */}
            <div className="flex items-center space-x-4">
                 <nav className="hidden md:flex items-center space-x-2">
                     {renderLinks()}
                 </nav>
                
                {!loading && (
                    <>
                        {user ? (
                             <>
                                <Link href="/donate" className="donate-btn hidden md:flex">
                                    <PackagePlus size={16} className="mr-2" />Donate
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="rounded-full w-10 h-10 bg-blue-500 text-white border-blue-400 hover:bg-blue-600">
                                            {getInitials(user.displayName)}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 mr-2">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.push('/profile')}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push('/donations')}>
                                            <Box className="mr-2 h-4 w-4" />
                                            <span>My Donations</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push('/requested')}>
                                            <Heart className="mr-2 h-4 w-4" />
                                            <span>My Requests</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push('/messages')}>
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            <span>Messages</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push('/about')}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>About</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                             </>
                        ) : (
                           <div className="hidden md:flex items-center space-x-2">
                               <Link href="/login" className="login-btn">
                                  <LogIn size={16} className="mr-2" /> Login
                               </Link>
                               <Link href="/register" className="signup-btn">
                                  <PackagePlus size={16} className="mr-2" /> Sign Up
                               </Link>
                           </div>
                        )}
                    </>
                )}
                 {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white focus:outline-none"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>


            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 bg-[#0404e2] bg-opacity-95 p-4 shadow-lg">
                    <nav className="flex flex-col space-y-2">
                        {renderLinks(true)}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
