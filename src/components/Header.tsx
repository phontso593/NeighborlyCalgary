
'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/whitePrancheta 12.png';
import { LogOut, PackagePlus, User, MessageSquare, Box, Heart, LogIn } from 'lucide-react';
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
        }
    };

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    }

    return (
        <header className="bg-[#0404e2] text-white p-4 flex justify-between items-center w-full shadow-md sticky top-0 z-50">
            <div className="flex-1"></div>
            <Link href={user ? "/login-user" : "/"} className="flex items-center">
                <Image src={logo} alt="Neighborly Logo" width={50} height={50} className="h-12 w-auto" priority />
            </Link>

            {/* Combined Desktop Navigation and Profile */}
            <div className="flex-1 flex justify-end items-center space-x-4">
                 <nav className="hidden md:flex items-center space-x-2">
                 </nav>
                
                {!loading && (
                    <>
                        {user ? (
                             <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="rounded-full w-10 h-10 bg-blue-500 text-white border-blue-400 hover:bg-blue-600">
                                            {getInitials(user.displayName)}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 mr-2">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuItem asChild className="p-0">
                                            <Link href="/donate" className="w-full justify-start cursor-pointer m-1 p-2 rounded-md bg-green-600 text-white hover:bg-green-700 focus:bg-green-700 focus:text-white flex items-center">
                                                 <PackagePlus size={16} className="mr-2" />Donate
                                            </Link>
                                        </DropdownMenuItem>
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
                                        <DropdownMenuItem onClick={handleLogout} className="bg-red-500 text-white hover:bg-red-600 focus:bg-red-700 cursor-pointer">
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
            </div>
        </header>
    );
};

export default Header;
