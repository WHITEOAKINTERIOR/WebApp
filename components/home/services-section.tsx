import { Button } from "../ui/button"
import { SectionHeading } from "../shared/section-heading"
import { servicesContent } from "@/content/services/servicesSectionContent"
import Link from "next/link"

export function ServicesSection() {
  return (
    <section id="services" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeading
            title={servicesContent.sectionTitle.title}
            subtitle={servicesContent.sectionTitle.subtitle}
            highlightText={servicesContent.sectionTitle.highlightText}
            className="mb-4"
          />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of interior design services to transform your space
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesContent.services.map((service, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
            >
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {service.description}
              </p>
              <Button variant="link" className="w-fit p-0 h-auto text-primary group">
                <Link href={`/services`}>
                  Read more
                </Link>
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  {servicesContent.ctaButton.icon}
                </span>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="gap-2 group">
            <Link href={`/services`}>
              {servicesContent.ctaButton.text}
            </Link>
            <span className="transition-transform group-hover:translate-x-1">
              {servicesContent.ctaButton.icon}
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}
