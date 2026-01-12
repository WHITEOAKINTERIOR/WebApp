
export const commonContent = {
    companyName: "White Oak Interior",
    companyLogo: "/images/logo.png",
    companyDescription: "White Oak Interior is a leading interior design company that specializes in creating beautiful and functional spaces for our clients.",
    phone: "+91 9560885007",
    Email: "info@whiteoakinterior.com",
    Address: "Noida, Uttar Pradesh, India",
    facebook: "https://www.facebook.com/whiteoakinterior",
    twitter: "https://twitter.com/whiteoakinterior",
    instagram: "https://www.instagram.com/whiteoakinterior",
    linkedin: "https://www.linkedin.com/company/whiteoakinterior",
    youtube: "https://www.youtube.com/whiteoakinterior",
}


export interface ButtonContent {
  text: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary' | 'destructive' | null | undefined;
  icon?: string;
  href?: string;
}

export interface SectionTitle {
  title: string;
  subtitle?: string;
  highlightText?: string;
  description?: string;
}




