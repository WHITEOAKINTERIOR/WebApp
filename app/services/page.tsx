// app/services/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Zap } from 'lucide-react';
import { allServices } from '@/content/services/servicesSharedContent';
import { servicesPageContent } from '@/content/services/servicesPageContent';
import { SectionHeading } from '@/components/shared/section-heading';
import { servicesContent } from '@/content/services/servicesSectionContent';
import { PageHero } from '@/components/shared/page-hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <PageHero 
      title={"Transforming Spaces"}
      description={"We deliver exceptional interior design solutions"}
      />
      
      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <SectionHeading
              title={servicesContent.sectionTitle.title}
              subtitle={servicesContent.sectionTitle.subtitle}
              highlightText={servicesContent.sectionTitle.highlightText}
              className="mb-16"
            />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive design solutions for residential and commercial spaces
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service: any, index: any) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features?.map((feature: any, i: any) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <SectionHeading
              title={"Our Design"}
              subtitle={""}
              highlightText={"Process"}
              className="mb-16"
            />
            <p className="text-gray-600 max-w-2xl mx-auto">
              A streamlined approach to bringing your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesPageContent.processSteps?.map((step: any, index: any) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-gray-600 mb-8">
              Let's discuss how we can bring your vision to life with our expert design services.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get Started</Link>
            </Button>
            
          </div>
        </div>
      </section>
    </div>
  );
}