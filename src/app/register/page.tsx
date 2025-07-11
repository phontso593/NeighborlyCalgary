'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import app from "@/lib/firebase";
import logo from "@/assets/neighborly-hor logo.png";
import githubLogo from "@/assets/github logo.png";
import googleLogo from "@/assets/google logo.jpg";
import facebookLogo from "@/assets/facebook logo.webp";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      router.push("/dashboard");
    } catch (error) {
      const errorCode = (error as { code?: string }).code;
      if (errorCode === 'auth/email-already-in-use') {
        alert("Email already in use. Please try another email.");
      } else if (errorCode === 'auth/weak-password') {
        alert("Weak password. Please enter a stronger password.");
      } else {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        alert("Error during registration: " + errorMessage);
      }
    }
    setLoading(false);
  };

  const handleSocialSignUp = async (provider: GoogleAuthProvider | OAuthProvider) => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      alert("Sign up successful!");
      router.push("/dashboard");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      alert("Sign up failed: " + errorMessage);
    }
    setLoading(false);
  };

  const handleGoogleSignUp = () => handleSocialSignUp(new GoogleAuthProvider());
  const handleGithubSignUp = () => handleSocialSignUp(new OAuthProvider('github.com'));
  const handleFacebookSignUp = () => handleSocialSignUp(new OAuthProvider('facebook.com'));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <Image src={logo} alt="Neighborly Logo" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>
        
        <div className="flex justify-center space-x-4">
          <button onClick={handleGithubSignUp} className="p-2 border rounded-md hover:bg-gray-100">
            <Image src={githubLogo} alt="GitHub" width={24} height={24} />
          </button>
          <button onClick={handleGoogleSignUp} className="p-2 border rounded-md hover:bg-gray-100">
            <Image src={googleLogo} alt="Google" width={24} height={24} />
          </button>
          <button onClick={handleFacebookSignUp} className="p-2 border rounded-md hover:bg-gray-100">
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
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email-register" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email-register"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email..."
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password@123"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center">
            <input id="terms" name="terms" type="checkbox" required className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="terms" className="block ml-2 text-sm text-gray-900">
              I accept the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
