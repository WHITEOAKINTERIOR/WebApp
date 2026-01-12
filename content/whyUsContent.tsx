import { CheckCircle, Award, Users, Clock, ArrowRight } from "lucide-react";
import React from 'react';
import { commonContent } from "./sharedContent";

export interface WhyUsContent {
  sectionTitle: {
    title: string;
    subtitle: string;
    highlightText: string;
    description: string;
  };
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  ctaButton: {
    text: string;
    icon: React.ReactNode;
  };
}

export const whyUsContent: WhyUsContent = {
  sectionTitle: {
    title: "Why",
    subtitle: "Reason to choose us",
    highlightText: commonContent.companyName,
    description: "We're committed to delivering exceptional interior design solutions that exceed your expectations"
  },
  features: [
    {
      title: "Experienced Team",
      description: "Our team brings years of expertise in creating stunning interiors that stand the test of time.",
      icon: React.createElement(Users, { className: "h-6 w-6" })
    },
    {
      title: "Quality Craftsmanship",
      description: "We use only the finest materials and work with skilled craftsmen to ensure exceptional quality.",
      icon: React.createElement(Award, { className: "h-6 w-6" })
    },
    {
      title: "On-Time Delivery",
      description: "We respect your time and ensure all projects are completed within the agreed timeline.",
      icon: React.createElement(Clock, { className: "h-6 w-6" })
    },
    {
      title: "Customer Satisfaction",
      description: "Your satisfaction is our top priority. We work closely with you to bring your vision to life.",
      icon: React.createElement(CheckCircle, { className: "h-6 w-6" })
    }
  ],
  ctaButton: {
    text: "Read More About Our Process",
    icon: React.createElement(ArrowRight, { className: "w-5 h-5" })
  }
};
