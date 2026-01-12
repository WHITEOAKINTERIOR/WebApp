import { ButtonContent, commonContent } from "../sharedContent";
import { AboutStatItem, aboutStats } from "./aboutSharedContent";


export interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface AboutContent {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    description: string[];
    image: string;
  };
  stats: AboutStatItem[];
  values: {
    title: string;
    subtitle: string;
    items: CoreValue[];
  };
  team: {
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  cta: {
    title: string;
    description: string;
    button: ButtonContent;
  };
}

export const aboutPageContent: AboutContent = {
  hero: {
    title: "Our Story",
    subtitle: "Crafting spaces that inspire and transform lives"
  },
  about: {
    title: "Who We Are",
    description: [
      `At ${commonContent.companyName}, we believe that great design has the power to transform spaces and elevate lives. Founded in 2009, our team of passionate designers and craftsmen work together to create beautiful, functional spaces that reflect our clients' unique personalities and lifestyles.`,
      "Our approach combines innovative design, quality craftsmanship, and attention to detail to deliver exceptional results that stand the test of time."
    ],
    image: "/images/about-1.jpg"
  },
  stats: aboutStats,
  values: {
    title: "Our Core Values",
    subtitle: "Guiding principles that shape our work and relationships with clients",
    items: [
      {
        icon: "Award",
        title: "Excellence",
        description: "We strive for the highest standards in every project we undertake."
      },
      {
        icon: "Palette",
        title: "Creativity",
        description: "Innovative designs that transform spaces into works of art."
      },
      {
        icon: "Clock",
        title: "Timeliness",
        description: "We respect your time and deliver projects on schedule."
      },
      {
        icon: "Shield",
        title: "Integrity",
        description: "Honest communication and transparency in all our dealings."
      }
    ]
  },
  team: {
    title: "Meet Our Team",
    subtitle: "Passionate professionals dedicated to bringing your vision to life",
    members: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Lead Designer",
        image: "/images/team-1.jpg"
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Senior Architect",
        image: "/images/team-2.jpg"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        role: "Project Manager",
        image: "/images/team-3.jpg"
      }
    ]
  },
  cta: {
    title: "Ready to transform your space?",
    description: "Let's create something beautiful together. Schedule a free consultation with our design experts today.",
    button: {
      text: "Get Started",
      href: "/contact",
      variant: "secondary"
    }
  }
};
