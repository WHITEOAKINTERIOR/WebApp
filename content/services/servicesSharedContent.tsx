import { ReactNode } from 'react';
import { Home, Layout, Box, Ruler, Lightbulb, Users, Building, Clock, Palette, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

export interface SectionTitle {
  title: string;
  subtitle: string;
  highlightText: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: ReactNode;
  features?: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface CtaButton {
  text: string;
  icon: ReactNode;
}

export interface ServicesContent {
  sectionTitle: SectionTitle;
  services: ServiceItem[];
  ctaButton: CtaButton;
  processSteps?: ProcessStep[];
}

// Shared services list
export const allServices: ServiceItem[] = [
  {
    title: "Residential Design",
    description: "Transform your home into a beautiful and functional space that reflects your personal style.",
    icon: <Home className="w-6 h-6" />,
    features: [
      "Space planning & layout",
      "Furniture selection",
      "Color consultation",
      "Lighting design",
      "Material & finish selection"
    ]
  },
  {
    title: "Commercial Design",
    description: "Create inspiring work environments that boost productivity and reflect your brand identity.",
    icon: <Building className="w-6 h-6" />,
    features: [
      "Office space planning",
      "Brand integration",
      "Reception & lobby design",
      "Conference rooms",
      "Breakout areas"
    ]
  },
  {
    title: "3D Visualization",
    description: "See your space come to life with our photorealistic 3D renderings before implementation.",
    icon: <Layout className="w-6 h-6" />,
    features: [
      "3D modeling",
      "Virtual walkthroughs",
      "Material & finish visualization",
      "Lighting studies",
      "Multiple design options"
    ]
  },
  {
    title: "Space Planning",
    description: "Optimize your space with our professional space planning solutions for maximum efficiency.",
    icon: <Layout className="w-6 h-6" />
  },
  {
    title: "Project Management",
    description: "From concept to completion, we handle every detail of your project with precision.",
    icon: <Ruler className="w-6 h-6" />
  },
  {
    title: "Custom Furniture",
    description: "Bespoke furniture pieces designed specifically for your space and style.",
    icon: <Box className="w-6 h-6" />
  }
];



// Shared CTA button
export const defaultCtaButton: CtaButton = {
  text: 'View All Services',
  icon: <ArrowRight className="w-5 h-5" />
};