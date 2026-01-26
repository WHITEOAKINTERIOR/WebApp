import { Button } from "@/components/ui/button";
import { Check, Award, Users, Palette, Clock, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { aboutPageContent } from "@/content/about/aboutPageContent";
import { commonContent } from "@/content/sharedContent";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";

// Map icon names to components
const iconComponents: { [key: string]: React.ElementType } = {
  Award,
  Palette,
  Clock,
  Shield,
};

export default function AboutPage() {
  const { hero, about, stats, values, team, cta } = aboutPageContent;

  return (
    <main className="min-h-screen">
      <PageHero
        title={hero.title}
        description={hero.subtitle}
      />

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title={"Who"}
                highlightText="We Are"
              />
              {about.description.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground mb-6 last:mb-8">
                  {paragraph}
                </p>
              ))}
              <Button asChild size="lg">
                <Link href="/our-works">View Our Work</Link>
              </Button>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src={about.image}
                alt="Design process"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
                {stat.description && (
                  <p className="text-sm text-muted-foreground/70 mt-1">{stat.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <SectionHeading
                title={"Our Core"}
                highlightText="Values"
              />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {values.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.items.map((value, index) => {
              const IconComponent = iconComponents[value.icon] || null;
              return (
                <div key={index} className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {IconComponent && <IconComponent className="w-8 h-8 text-primary" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{team.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {team.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.members.map((member) => (
              <div key={member.id} className="group">
                <div className="relative h-80 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{cta.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {cta.description}
          </p>
          <Button asChild size="lg">
            <Link href={cta.button.href || '#'}>{cta.button.text}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
