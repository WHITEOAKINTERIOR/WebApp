// content/testimonialsContent.ts
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  videoUrl?: string;
  project?: string;
  gallery?: {
    images: string[];
    title?: string;
  };
}

export interface TestimonialsContent {
  sectionTitle: {
    title: string;
    highlightText: string;
    description: string;
  };
  testimonials: Testimonial[];
}

export const testimonialsContent: TestimonialsContent = {
  sectionTitle: {
    title: "What Our",
    highlightText: "Clients Say",
    description: "Hear from our satisfied clients about their experience working with our design team"
  },
  testimonials: [
    {
      id: 1,
      name: "Jitendra Singh",
      role: "Tenant",
      company: "",
      avatar: "",
      content: "The team transformed our apartment into a modern masterpiece. Their attention to detail and design expertise is unmatched. We couldn't be happier with the results!",
      rating: 5,
      project: "Luxury Apartment",
      // videoUrl: "https://www.youtube.com/embed/tW7ItIBq7uQ",
      // gallery: {
      //   title: "Apartment Transformation",
      //   images: [
      //     "/images/projects/living-room.jpg",
      //     "/images/projects/kitchen.jpg",
      //     "/images/projects/bedroom.jpg"
      //   ]
      // }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO",
      company: "TechStart Inc.",
      avatar: "",
      content: "Our new office space has completely transformed our company culture. The design is not only beautiful but also highly functional for our team's needs.",
      rating: 5,
    
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Interior Designer",
      company: "DesignHub",
      avatar: "",
      content: "As a fellow designer, I'm extremely particular about details. This team's work is exceptional - their use of space and materials is truly inspiring.",
      rating: 4,
      project: "Minimalist Studio"
    }
  ]
};