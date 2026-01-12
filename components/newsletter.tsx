"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

export const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast({
                title: "Error",
                description: "Please enter your email address",
                variant: "destructive",
            });
            return;
        }

        setIsSubscribing(true);

        try {
            // Replace with your actual API endpoint
            // const response = await fetch("/api/subscribe", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ email }),
            // });

            // if (!response.ok) throw new Error("Subscription failed");

            toast({
                title: "Success!",
                description: "Thank you for subscribing to our newsletter!",
                variant: "success",
            });
            setEmail(""); // Clear the input on success
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to subscribe. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubscribing(false);
        }
    };

    return (
        <div>
            <h4 className="text-sm font-semibold mb-4 text-white">NEWSLETTER</h4>
            <p className="text-sm text-slate-400 mb-4">
                Subscribe to our newsletter for the latest updates and trends.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        className="px-4 py-2 text-sm bg-slate-800 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1 placeholder-slate-500"
                        disabled={isSubscribing}
                        required
                    />
                    <Button
                        type="submit"        
                        variant="outline"
                        className="bg-primary hover:bg-secondary/10 hover:text-white"
                        disabled={isSubscribing}
                    >
                        {isSubscribing ? "Subscribing..." : "Subscribe"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
