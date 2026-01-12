import { commonContent } from "../sharedContent";

export interface AboutStatItem {
  value: string;
  label: string;
  description: string;
}

export const description: string[] = [
    `At ${commonContent.companyName}, we believe in the transformative power of well-designed spaces. Our team of passionate designers and craftsmen work together to create environments that blend functionality with aesthetic appeal.`,
    `With over a decade of experience in the industry, we've mastered the art of turning visions into reality, one space at a time.`
  ]

export const aboutStats: AboutStatItem[] = [
    {
      value: "10+",
      label: "Years Experience",
      description: "Delivering exceptional interior solutions"
    },
    {
      value: "98%",
      label: "Client Retention",
      description: "Satisfied clients who return"
    },
    {
      value: "500+",
      label: "Projects Done",
      description: "Successfully completed projects"
    },
    {
      value: "50K+",
      label: "Sq. Ft. Delivered",
      description: "Beautiful spaces created"
    }
  ]

