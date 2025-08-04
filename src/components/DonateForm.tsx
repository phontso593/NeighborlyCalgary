
'use client';
import React, { useState, useRef, useEffect } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase"; // Make sure this path is correct
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Make sure this path is correct
import { PackagePlus, Camera, Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"; // Make sure this path is correct

const DonateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const categories = ["Clothes", "Books", "Toys", "Electronics", "Furniture", "Food", "Other"];
  const conditions = ["New", "Like New", "Gently Used", "Used - Good", "Used - Fair"];

  useEffect(() => {
    // Cleanup function to stop camera stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCameraAccess = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({ variant: "destructive", title: "Camera Not Supported" });
        return;
    }
    setShowCamera(true);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    } catch (error) {
        console.error("Error accessing camera:", error);
        toast({ variant: "destructive", title: "Camera Access Denied" });
        setShowCamera(false);
    }
  };
  
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        setImage(dataUrl);
      }
      // Stop camera stream after capture
      if (video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      setShowCamera(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: "destructive", title: "Authentication Error", description: "You must be logged in." });
      router.push("/login");
      return;
    }
    
    setIsSubmitting(true);

    try {
      let imageUrl = '';
      if(image){
         // 1. Upload Image to Firebase Storage
        const storageRef = ref(storage, `donations/${user.uid}/${Date.now()}`);
        const uploadResult = await uploadString(storageRef, image, 'data_url');
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      // 2. Add Donation document to Firestore
      await addDoc(collection(db, "donations"), {
        title: title, 
        description,
        category,
        condition,
        imageUrl,
        status: "available", // Set default status
        createdAt: Timestamp.now(),
        donatorId: user.uid, // Correct field name for security rules
        ownerName: user.displayName || 'Anonymous',
      });

      toast({ title: "Success!", description: `Donated ${title}` });
      
      // Reset form state
      setTitle("");
      setDescription("");
      setCategory("");
      setCondition("");
      setImage(null);
      router.refresh();

    } catch (error) {
      console.error("Donation failed:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({ variant: "destructive", title: "Donation Failed", description: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-600">Add New Donation</h1>
              <p className="mt-2 text-lg text-gray-600">Share your items with the community.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="item-title" className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                    <input id="item-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g., Winter Jacket, Set of Novels" className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Provide details about the item, its condition, size, etc." rows={4} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white">
                            <option value="" disabled>Select category</option>
                            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                        <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white">
                            <option value="" disabled>Select condition</option>
                            {conditions.map((cond) => <option key={cond} value={cond}>{cond}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image (Optional)</label>
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={handleCameraAccess} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                            <Camera size={16} /> Use Camera
                        </button>
                        <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 cursor-pointer">
                            <Upload size={16} /> Upload File
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                    </div>
                </div>
              
                {showCamera && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
                        <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-lg">
                            <h3 className="text-lg font-bold mb-2">Camera Preview</h3>
                            <video ref={videoRef} className="w-full aspect-video rounded-md bg-gray-900" autoPlay muted playsInline />
                            <div className="flex justify-between mt-4">
                                <button type="button" onClick={() => setShowCamera(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                                <button type="button" onClick={handleCapture} className="px-4 py-2 bg-blue-600 text-white rounded-md">Take Picture</button>
                            </div>
                        </div>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden"></canvas>

                {image && (
                    <div className="mt-4 relative">
                        <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                        <img src={image} alt="Preview" className="rounded-md max-h-48 w-auto border" />
                        <button type="button" onClick={() => setImage(null)} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full shadow-lg">
                            <X size={16} />
                        </button>
                    </div>
                )}

                <button type="submit" disabled={isSubmitting || !title || !category || !condition} className="w-full flex justify-center items-center gap-2 p-3 bg-blue-600 text-white font-bold rounded-md cursor-pointer hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed">
                    <PackagePlus size={20} />
                    {isSubmitting ? 'Submitting...' : 'Submit Donation'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default DonateForm;
