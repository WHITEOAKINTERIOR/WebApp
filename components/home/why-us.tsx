// components/why-us.tsx
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading"
import { whyUsContent } from "@/content/whyUsContent";



export function WhyUs() {

  const { sectionTitle, features, ctaButton } = whyUsContent;

  return (
    <section id="why-choose-us" className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
         <SectionHeading
                     title={sectionTitle.title}
                     subtitle={sectionTitle.subtitle}
                     highlightText={sectionTitle.highlightText}
                     className="mb-16"
                   />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {sectionTitle.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature: any, index: number) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <Button size="lg" variant="outline" className="gap-2 group">
            {ctaButton.text}
            {ctaButton.icon}
          </Button>
        </div> */}
      </div>
    </section>
  )
}