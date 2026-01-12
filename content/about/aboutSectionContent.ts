import { ButtonContent, commonContent, SectionTitle } from "../sharedContent";
import { AboutStatItem, aboutStats, description } from "./aboutSharedContent";


export interface AboutContent {
  sectionTitle: SectionTitle;
  description: string[];
  buttons: ButtonContent[];
  stats: AboutStatItem[];
}

export const aboutContent: AboutContent = {
  sectionTitle: {
    title: "About",
    subtitle: "Who we are",
    highlightText: commonContent.companyName,
  },
  description: description,
  buttons: [
    {
      text: "Read More",
      icon: "ArrowRight"
    },
    {
      text: "Our Works",
      variant: "outline"
    }
  ],
  stats: aboutStats
};
