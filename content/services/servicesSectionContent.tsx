import { Home, Layout, Box, Ruler, Lightbulb, Users, ArrowRight } from "lucide-react";
import { ServicesContent } from "./servicesSharedContent";
import { allServices } from "./servicesSharedContent";

export const servicesContent: ServicesContent = {
  sectionTitle: {
    title: "Our",
    subtitle: "What we offer",
    highlightText: "Services"
  },
  services:allServices.slice(0, 3),
  ctaButton: {
    text: "View All Services",
    icon: <ArrowRight className="w-5 h-5" />
  }
};
