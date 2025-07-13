'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider, FacebookAuthProvider } from "firebase/auth";
import app from "@/lib/firebase";
import logo from "@/assets/neighborly-hor logo.png";
import { Github, Facebook, Share2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/login-user");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      alert("Login failed: " + errorMessage);
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: GoogleAuthProvider | OAuthProvider | FacebookAuthProvider) => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push("/login-user");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      alert("Login failed: " + errorMessage);
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => handleSocialLogin(new GoogleAuthProvider());
  const handleGithubLogin = () => handleSocialLogin(new OAuthProvider('github.com'));
  const handleFacebookLogin = () => handleSocialLogin(new FacebookAuthProvider());

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center">
          <Image src={logo} alt="Neighborly Logo" width={80} height={80} />
      </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome back</h2>
        <p className="text-sm text-center text-gray-500">Please enter your details to sign in.</p>
        
        <div className="flex justify-center space-x-4">
          <button onClick={handleGithubLogin} className="p-3 border rounded-full hover:bg-gray-100">
            <Github size={24} />
          </button>
          <button onClick={handleGoogleLogin} className="p-3 border rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.574l6.19 5.238C42.021 35.596 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
          </button>
          <button onClick={handleFacebookLogin} className="p-3 border rounded-full hover:bg-gray-100">
            <Facebook size={24} />
          </button>
        </div>

        <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email..."
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password-login" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password-login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password@123"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account yet?{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
