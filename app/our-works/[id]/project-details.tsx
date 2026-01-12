// app/our-works/[id]/project-details.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { commonContent } from '@/content/sharedContent';
import { PageHero } from '@/components/shared/page-hero';

export function ProjectDetails({ project }: { project: any }) {
    return (
        <div className="min-h-screen">
            <PageHero
                title={project.title}
                description={project.location}
            />



            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/our-works" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Projects
                </Link>
            </div>

            {/* Project Gallery */}
            <section className="">
                <div className="relative w-full h-64 md:h-96 mb-12 container mx-auto px-4">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        />
                    </div>
                </div>
            </section>
            <div className="max-w-3xl mx-auto px-4">
                <div className="prose prose-lg max-w-none">
                    <h2>Project Overview</h2>
                    <p>{project.description}</p>

                    <h3>Project Details</h3>
                    <ul>
                        <li><strong>Location:</strong> {project.location}</li>
                        <li><strong>Category:</strong> {project.category}</li>
                        {project.tags && (
                            <li>
                                <strong>Tags:</strong>{' '}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.tags.map((tag: string, index: number) => (
                                        <span key={index} className="px-3 py-1 text-sm rounded-full bg-gray-100">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Have a Similar Project in Mind?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Let's discuss how we can bring your vision to life with our expert design services.
                    </p>
                    <Button asChild size="lg">
                        <Link href={"/contact"}>{"Contact Us"}</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}