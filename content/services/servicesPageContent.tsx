import { CheckCircle2, Layout, Palette, Home, Building, Ruler, Clock, Zap } from 'lucide-react';
import { ServicesContent } from './servicesSharedContent';
import { allServices } from './servicesSharedContent';

export const servicesPageContent: ServicesContent = {
  sectionTitle: {
    title: 'Our',
    subtitle: 'What we offer',
    highlightText: 'Services'
  },
  services: allServices,
  ctaButton: {
    text: 'View All Services',
    icon: <Zap className="w-5 h-5" />
  },
  processSteps: [
    {
      title: "Consultation",
      description: "We discuss your vision, requirements, and budget.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Concept Development",
      description: "We create initial design concepts for your review.",
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: "Design Refinement",
      description: "We refine the design based on your feedback.",
      icon: <Ruler className="w-6 h-6" />
    },
    {
      title: "Implementation",
      description: "We oversee the execution to ensure perfect results.",
      icon: <CheckCircle2 className="w-6 h-6" />
    }
  ]
};
