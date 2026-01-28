import { commonContent } from "./sharedContent";

export interface HeroContent {
  backgroundImage: {
    light: string;
    dark: string;
    alt: string;
  };
  heading: string;
  form: {
    title: string;
  };
}

export const heroContent: HeroContent = {
  backgroundImage: {
    light: "/images/hero-background.avif",
    dark: "/images/hero-background.avif",
    alt: commonContent.companyName,
  },
  heading: `Transform your space into \n Vastu-Aligned Interiors \n for Prosperous Living`,
 
  form: {
    title: "Book Free Consultation",
  }
};
