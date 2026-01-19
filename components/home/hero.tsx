"use client";

// components/hero.tsx
import Image from 'next/image'
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { EnquiryForm } from "@/components/enquiry-form"
import { heroContent } from "@/content/heroContent"
import { commonContent } from '@/content/sharedContent';
import { EnquiryPopup } from "@/components/enquiry-popup"
import Link from "next/link"

export function Hero() {
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex items-start pt-24 overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                {/* <div
                    className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/10 to-white/0 dark:from-black/80 dark:to-black/60 z-10"
                    aria-hidden="true"
                /> */}
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 animate-zoom-in-out">
                        <Image
                            src={heroContent.backgroundImage.light}
                            alt={heroContent.backgroundImage.alt}
                            fill
                            priority
                            quality={85}
                            className="object-cover transition-opacity duration-300 dark:opacity-0"
                            sizes="(max-width: 768px) 100vw, 100vw"
                        />
                    </div>
                    <div className="absolute inset-0 animate-zoom-in-out">
                        <Image
                            src={heroContent.backgroundImage.dark}
                            alt={heroContent.backgroundImage.alt}
                            fill
                            priority
                            quality={85}
                            className="object-cover opacity-0 transition-opacity duration-300 dark:opacity-100"
                            sizes="(max-width: 768px) 100vw, 100vw"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 md:py-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Left side - Content (2/3 width on lg screens) */}
                    <div className="lg:col-span-2 space-y-6 justify-center">
                        <h3 className="text-2xl text-center md:text-5xl font-bold tracking-tight text-white [text-shadow:1px_1px_6px_rgba(0,0,0,0.8)]">
                            {heroContent.heading}
                        </h3>
                        <h3 className="text-2xl text-center md:text-5xl font-bold tracking-tight text-white [text-shadow:1px_1px_6px_rgba(0,0,0,0.8)]">
                            {commonContent.companyName}
                        </h3>
                        <div className="flex flex-wrap flex-col gap-4 pt-4 w-full items-center">
                                <Button variant={"default"} className='w-64'                               >
                                    <Link href='/services'>
                                    {"Explore more"}
                                    </Link>
                                </Button>
                                 <Button 
                                    variant={"outline"} 
                                    className='md:hidden w-64'
                                    onClick={() => setIsEnquiryOpen(true)}
                                 >
                                    {"Book Free Consultation"}
                                 </Button>
                                 
                                 <EnquiryPopup 
                                    isOpen={isEnquiryOpen}
                                    onClose={() => setIsEnquiryOpen(false)}
                                    title={heroContent.form.title}
                                    
                                 />
                            
                        </div>
                    </div>

                    {/* Right side - Enquiry Form (1/3 width on lg screens) */}
                    <div className="hidden md:block lg:col-span-1 bg-background/80 backdrop-blur-sm p-6 my-4 mx-8 rounded-lg shadow-lg border border-border">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            {heroContent.form.title}
                        </h2>
                        <EnquiryForm />
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                aria-hidden="true"
            >
                <div className="w-8 h-12 border-2 border-foreground/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-foreground/50 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    )
}