// components/navbar.tsx
"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Info, Briefcase, Image as ImageIcon, Phone, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { commonContent } from "@/content/sharedContent"

// Custom hook to handle mobile detection
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Initial check
        checkMobile()

        // Add event listener for window resize
        window.addEventListener('resize', checkMobile)

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile)
    }, [])
    return isMobile
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const isMobile = useIsMobile()
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 32)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { 
            name: "Home", 
            href: "/",
            icon: <Home className="w-4 h-4 mr-2" />
        },
        { 
            name: "About", 
            href: "/about",
            icon: <Info className="w-4 h-4 mr-2" />
        },
        { 
            name: "Services", 
            href: "/services",
            icon: <Briefcase className="w-4 h-4 mr-2" />
        },
        { 
            name: "Our Works", 
            href: "/our-works",
            icon: <ImageIcon className="w-4 h-4 mr-2" />
        }
    ]

    // Determine if we should use fixed positioning
    const shouldBeFixed = isScrolled || isMobile
    return (
        <header
            className={`w-full ${shouldBeFixed
                ? "fixed bg-primary top-0 left-0 right-0 backdrop-blur-md shadow-lg z-50"
                : "absolute top-8 left-0 right-0 z-50"
                }`}
        >
            <div className={`container mx-auto px-4 ${!shouldBeFixed
                ? "bg-primary rounded-lg"
                : ""
                }`}>
                <div className="flex justify-between items-center h-[4.25rem]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/images/logo.png"
                            alt={commonContent.companyName}
                            width={160}  // Adjust based on your logo's aspect ratio
                            height={160}  // Adjust based on your logo's aspect ratio
                            className="h-12 w-auto"  // Maintain aspect ratio
                            priority
                        />
                        <span className="sr-only">{commonContent.companyName}</span>
                        <span className="text-xl px-[0.5rem] font-bold text-primary-foreground whitespace-nowrap">
                            {commonContent.companyName}
                        </span>
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center w-full">
                        <nav className="mx-auto flex items-center space-x-8">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/' && pathname.startsWith(item.href))
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "relative py-2 px-4 transition-all duration-300 group hover:bg-foreground/5 rounded-lg",
                                            isActive
                                                ? "text-foreground font-semibold bg-foreground/10"
                                                : "text-foreground/80 hover:text-foreground"
                                        )}
                                    >
                                        <span className="relative z-10 flex flex-col items-center align-center">
                                            {React.cloneElement(item.icon, {
                                                className: cn(
                                                    "w-4 h-4 transition-transform duration-300",
                                                    isActive ? "scale-110" : "group-hover:scale-110"
                                                )
                                            })}
                                            <span className="relative">
                                                {item.name}
                                                <span className={cn(
                                                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300",
                                                    isActive ? "w-full" : "group-hover:w-full"
                                                )} />
                                            </span>
                                        </span>
                                    </Link>
                                )
                            })}
                        </nav>
                        <Link href="/contact" passHref>
                            <Button 
                                size="sm" 
                                variant="outline"
                                className="ml-8 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300"
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-primary-foreground hover:bg-primary-foreground/20"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border mt-4">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center group",
                                        pathname === item.href
                                            ? "text-foreground font-semibold bg-foreground/5"
                                            : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {React.cloneElement(item.icon, {
                                        className: cn(
                                            "w-4 h-4 mr-3 transition-transform duration-300",
                                            pathname === item.href ? "scale-110" : "group-hover:scale-110"
                                        )
                                    })}
                                    <span className="relative">
                                        {item.name}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300",
                                            pathname === item.href ? "w-full" : "group-hover:w-full"
                                        )} />
                                    </span>
                                </Link>
                            ))}
                            <Link href="/contact" passHref className="w-full block">
                                <Button 
                                    variant="outline"
                                    className="w-full mt-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300"
                                    size="sm" 
                                    onClick={() => setIsOpen(false)}
                                >
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}