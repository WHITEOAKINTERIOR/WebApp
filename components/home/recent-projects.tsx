// components/recent-projects.tsx
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { projectsContent } from "@/content/projectsContent"
import { SectionHeading } from "@/components/shared/section-heading"
import Link from "next/link"

export function RecentProjects() {
  const { sectionTitle, projects } = projectsContent;

  return (
    <section id="projects" className="py-12 bg-muted relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <SectionHeading
            title={sectionTitle.title}
            highlightText={sectionTitle.highlightText}
            subtitle={sectionTitle.subtitle}
            className="mb-6"
          />
          <p className="text-lg text-muted-foreground">
            {sectionTitle.description}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors p-1 -mt-1 -mr-1"
                      aria-label={`View ${project.title} project`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-sm font-medium text-foreground">
                    {project.location}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary/10 group-hover:text-primary"
                    asChild
                  >
                    <Link href={`/our-works/${project.id}`} className="flex items-center gap-1">
                      View Project
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="group">
            <Link href="/our-works">
            View All Projects
            </Link>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}