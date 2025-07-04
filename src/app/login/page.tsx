'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import app from "@/lib/firebase";
import logo from "@/assets/neighborly-hor logo.png";
import githubLogo from "@/assets/github logo.png";
import googleLogo from "@/assets/google logo.jpg";
import facebookLogo from "@/assets/facebook logo.webp";

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
      alert("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      alert("Login failed: " + errorMessage);
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: GoogleAuthProvider | OAuthProvider) => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      alert("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      alert("Login failed: " + errorMessage);
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => handleSocialLogin(new GoogleAuthProvider());
  const handleGithubLogin = () => handleSocialLogin(new OAuthProvider('github.com'));
  const handleFacebookLogin = () => handleSocialLogin(new OAuthProvider('facebook.com'));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <Image src={logo} alt="Neighborly Logo" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome back</h2>
        <p className="text-sm text-center text-gray-500">Please enter your details to sign in.</p>
        
        <div className="flex justify-center space-x-4">
          <button onClick={handleGithubLogin} className="p-2 border rounded-md hover:bg-gray-100">
            <Image src={githubLogo} alt="GitHub" width={24} height={24} />
          </button>
          <button onClick={handleGoogleLogin} className="p-2 border rounded-md hover:bg-gray-100">
            <Image src={googleLogo} alt="Google" width={24} height={24} />
          </button>
          <button onClick={handleFacebookLogin} className="p-2 border rounded-md hover:bg-gray-100">
            <Image src={facebookLogo} alt="Facebook" width={24} height={24} />
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
