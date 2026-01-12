import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { aboutContent } from "@/content/about/aboutSectionContent"
import Link from "next/link"

export function AboutSection() {
  return (
    <section id="about" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionHeading
            title={aboutContent.sectionTitle.title}
            subtitle={aboutContent.sectionTitle.subtitle}
            highlightText={aboutContent.sectionTitle.highlightText}
            className="mb-16"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {aboutContent.description.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground text-justify">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild variant="default" size="lg" className="gap-2 group">
                <Link href="/about" aria-label="Read more about us">
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="gap-2 group">
                <Link href="/our-works" aria-label="View our works">
                  Our Works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutContent.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all h-full flex flex-col"
              >
                <div className="text-4xl font-bold text-primary mb-3">{stat.value}</div>
                <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                <p className="text-muted-foreground mt-auto">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
