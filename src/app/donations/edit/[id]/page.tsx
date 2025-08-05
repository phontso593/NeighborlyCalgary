
'use client';
import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { PackagePlus, Camera, Upload, X, Loader2 } from "lucide-react";
import type { Donation } from "@/types";

const EditDonationPage = () => {
    const [donation, setDonation] = useState<Donation | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [newImageFile, setNewImageFile] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const router = useRouter();
    const params = useParams();
    const { user } = useAuth();
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const donationId = Array.isArray(params.id) ? params.id[0] : params.id;
    const categories = ["Clothes", "Books", "Toys", "Electronics", "Furniture", "Food", "Other"];
    const conditions = ["New", "Like New", "Gently Used", "Used - Good", "Used - Fair"];

    useEffect(() => {
        if (!donationId || !user) return;

        const fetchDonation = async () => {
            setIsLoading(true);
            const docRef = doc(db, "donations", donationId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data() as Donation;
                if (data.donatorId === user.uid) {
                    setDonation({ id: docSnap.id, ...data });
                    setTitle(data.title);
                    setDescription(data.description);
                    setCategory(data.category);
                    setCondition(data.condition);
                    setImage(data.imageUrl || null);
                } else {
                    toast({ variant: "destructive", title: "Access Denied" });
                    router.push('/donations');
                }
            } else {
                toast({ variant: "destructive", title: "Not Found", description: "Donation not found." });
                router.push('/donations');
            }
            setIsLoading(false);
        };

        fetchDonation();
    }, [donationId, user, router, toast]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setImage(result);
                setNewImageFile(result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleCameraAccess = async () => { /* ... similar to DonateForm ... */ };
    const handleCapture = () => { /* ... similar to DonateForm ... */ };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !donation) {
            toast({ variant: "destructive", title: "Authentication Error" });
            return;
        }

        setIsSubmitting(true);
        let imageUrl = donation.imageUrl || '';

        try {
            // Handle image update
            if (newImageFile) {
                // If there was an old image, delete it
                if (donation.imageUrl) {
                    try {
                        const oldImageRef = ref(storage, donation.imageUrl);
                        await deleteObject(oldImageRef);
                    } catch (error: any) {
                         if (error.code !== 'storage/object-not-found') {
                            console.warn("Could not delete old image:", error);
                         }
                    }
                }
                // Upload the new image
                const storageRef = ref(storage, `donations/${user.uid}/${Date.now()}`);
                const uploadResult = await uploadString(storageRef, newImageFile, 'data_url');
                imageUrl = await getDownloadURL(uploadResult.ref);
            }

            // Update Firestore document
            const docRef = doc(db, "donations", donation.id);
            await updateDoc(docRef, {
                title,
                description,
                category,
                condition,
                imageUrl,
            });

            toast({ title: "Success!", description: "Donation updated successfully." });
            router.push("/donations");

        } catch (error) {
            console.error("Update failed:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast({ variant: "destructive", title: "Update Failed", description: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!donation) {
        // This case should be handled by the useEffect redirect, but as a fallback
        return <div className="text-center p-12">Donation not found or you do not have permission to edit it.</div>;
    }

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-600">Edit Donation</h1>
                    <p className="mt-2 text-lg text-gray-600">Update the details of your item.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="item-title" className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                        <input id="item-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-md shadow-sm" />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="w-full p-3 border border-gray-300 rounded-md shadow-sm" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white">
                                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                            <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white">
                                {conditions.map((cond) => <option key={cond} value={cond}>{cond}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Update Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>

                    {image && (
                        <div className="mt-4 relative">
                            <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                            <img src={image} alt="Preview" className="rounded-md max-h-48 w-auto border" />
                            <button type="button" onClick={() => {setImage(null); setNewImageFile(null);}} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full shadow-lg">
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 p-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 disabled:bg-green-300">
                        <PackagePlus size={20} />
                        {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditDonationPage;
