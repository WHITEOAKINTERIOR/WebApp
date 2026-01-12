// app/page.tsx
import { Hero } from "@/components/home/hero"
import { AboutSection } from "@/components/home/about-section"
import { ServicesSection } from "@/components/home/services-section"
import { WhyUs } from "@/components/home/why-us"
import { RecentProjects } from "@/components/home/recent-projects"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <AboutSection />
      <RecentProjects />
      <ServicesSection />
      <WhyUs />
      <Testimonials />
    </div>
  )
}