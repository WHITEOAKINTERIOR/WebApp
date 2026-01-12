// components/navbar.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
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
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Our Works", href: "/our-works" }
    ]

    // Determine if we should use fixed positioning
    const shouldBeFixed = isScrolled || isMobile
    return (
        <header
            className={`w-full ${shouldBeFixed
                ? "fixed bg-background/95 top-0 left-0 right-0 backdrop-blur-md shadow-lg z-50"
                : "absolute top-8 left-0 right-0 z-50"
                }`}
        >
            <div className={`container mx-auto px-4 ${!shouldBeFixed
                ? "bg-background/95 rounded-lg"
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
                            className="h-16 w-auto"  // Maintain aspect ratio
                            priority
                        />
                        <span className="sr-only">{commonContent.companyName}</span>
                        <span className="text-xl px-[0.5rem] font-bold text-foreground/50 whitespace-nowrap">
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
                                            "relative py-1 px-1 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                                            isActive
                                                ? "text-foreground font-semibold after:w-full"
                                                : "text-foreground/80 hover:text-foreground after:w-0 hover:after:w-full after:bg-foreground/20"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                        <Link href="/contact" passHref>
                            <Button size="sm" className="ml-8">
                                Contact Us
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
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
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                                        pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                                            ? "text-foreground bg-accent/30 font-semibold"
                                            : "text-foreground/80 hover:bg-accent/10 hover:text-foreground"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link href="/contact" passHref className="w-full block">
                                <Button className="w-full mt-2" size="sm" onClick={() => setIsOpen(false)}>
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