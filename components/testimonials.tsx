// components/testimonials.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { Play, Star, X, ChevronLeft, ChevronRight, Maximize2, XIcon, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "./shared/section-heading"
import { testimonialsContent } from "@/content/testimonialsContent"
import Image from "next/image"

export function Testimonials() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null)
    const marqueeRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [showControls, setShowControls] = useState(false)

    // Duplicate testimonials for seamless looping
    const duplicatedTestimonials = [...testimonialsContent.testimonials, ...testimonialsContent.testimonials]

    const playVideo = (url: string) => {
        setActiveVideo(url)
    }

    const closeVideo = () => {
        setActiveVideo(null)
    }

    const scrollLeft = () => {
        if (marqueeRef.current) {
            const scrollAmount = marqueeRef.current.offsetWidth / 2
            marqueeRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (marqueeRef.current) {
            const scrollAmount = marqueeRef.current.offsetWidth / 2
            marqueeRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }

    // Auto-scroll functionality
    useEffect(() => {
        const marquee = marqueeRef.current
        if (!marquee || isPaused) return

        let animationFrameId: number
        const speed = 0.5
        let position = 0

        const animate = () => {
            position += speed
            if (position >= marquee.scrollWidth / 2) {
                position = 0
            }
            marquee.scrollLeft = position
            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [isPaused])

    const { sectionTitle } = testimonialsContent

    return (
        <section
            id="testimonials"
            className="py-20 bg-background relative overflow-hidden"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <div className="absolute inset-0 -z-10 opacity-5">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.6))]"></div>
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <SectionHeading
                        title={sectionTitle.title}
                        highlightText={sectionTitle.highlightText}
                        className="mb-6"
                    />
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {sectionTitle.description}
                    </p>
                </div>

                <div className="relative group">
                    {/* Navigation Arrows */}
                    {showControls && (
                        <>
                            <button
                                onClick={scrollLeft}
                                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-lg hover:bg-primary hover:text-white transition-colors"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-lg hover:bg-primary hover:text-white transition-colors"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}

                    <div
                        ref={marqueeRef}
                        className="flex overflow-x-auto snap-x snap-mandatory md:snap-none hide-scrollbar py-4"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="flex space-x-6 px-4">
                            {duplicatedTestimonials.map((testimonial, index) => (
                                <div
                                    key={`${testimonial.id}-${index}`}
                                    className="flex-none w-80 md:w-96 snap-center"
                                >
                                    <TestimonialCard
                                        testimonial={testimonial}
                                        onPlayVideo={playVideo}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeVideo}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeVideo}
                            className="absolute -top-10 right-0 text-white hover:text-primary transition-colors z-10"
                            aria-label="Close video"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <iframe
                            src={`${activeVideo}?autoplay=1&mute=1`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Testimonial Video"
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    )
}

function TestimonialCard({ testimonial, onPlayVideo }: {
    testimonial: any,
    onPlayVideo: (url: string) => void
}) {
    const [imgSrc, setImgSrc] = useState(testimonial.avatar);
    const [imgError, setImgError] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

    const handleImageError = () => {
        if (!imgError) {
            setImgSrc('/images/testimonials/default-avatar.jpg');
            setImgError(true);
        }
    };

    const openGallery = (index: number) => {
        setGalleryIndex(index);
    };

    const closeGallery = () => {
        setGalleryIndex(null);
    };

    const navigateGallery = (direction: 'prev' | 'next') => {
        if (galleryIndex === null || !testimonial.gallery) return;

        const totalImages = testimonial.gallery.images.length;
        if (direction === 'prev') {
            setGalleryIndex((prev) => (prev === 0 ? totalImages - 1 : (prev || 0) - 1));
        } else {
            setGalleryIndex((prev) => (prev === totalImages - 1 ? 0 : (prev || 0) + 1));
        }
    };

    return (
        <div className="relative bg-muted rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <div className="flex items-center mb-6">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 mr-4 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    {!imgSrc || imgError ? (
                        <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                            {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                    ) : (
                        <Image
                            src={imgSrc}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="object-cover"
                            onError={handleImageError}
                        />
                    )}
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                        {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                    </p>
                    {testimonial.project && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                            {testimonial.project}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`}
                    />
                ))}
            </div>

            <blockquote className="text-muted-foreground mb-6 flex-grow">
                "{testimonial.content}"
            </blockquote>

            <div className="flex space-x-3 justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                {testimonial.videoUrl && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="group flex items-center"
                        onClick={() => onPlayVideo(testimonial.videoUrl!)}
                    >
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                    </Button>
                )}

                {/* Gallery Thumbnails */}
                {testimonial.gallery && testimonial.gallery.images.length > 0 && (

                    <Button
                        variant="outline"
                        size="sm"
                        className="group flex items-center"
                        onClick={() => openGallery(0)} // Open gallery at first image
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        View Gallery
                    </Button>

                )}
            </div>

            {/* Gallery Modal */}
            {galleryIndex !== null && testimonial.gallery && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeGallery}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeGallery();
                        }}
                        className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
                        aria-label="Close gallery"
                    >
                        <XIcon className="h-8 w-8" />
                    </button>

                    <div className="relative w-full max-w-4xl max-h-[90vh]">
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                            <Image
                                src={testimonial.gallery.images[galleryIndex]}
                                alt={`Gallery image ${galleryIndex + 1}`}
                                width={1200}
                                height={675}
                                className="object-contain max-h-[80vh] w-auto mx-auto"
                                priority
                            />

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateGallery('prev');
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateGallery('next');
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                aria-label="Next image"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="mt-2 text-center text-white">
                            {galleryIndex + 1} / {testimonial.gallery.images.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Add this to your global CSS or in a <style jsx> tag
const styles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-250px * 7))}
  }
`

// Add the styles to the document head
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style')
    styleElement.innerHTML = styles
    document.head.appendChild(styleElement)
}