import Link from "next/link"
import { commonContent } from "@/content/sharedContent"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Newsletter } from "./newsletter"
import Image from "next/image"

export function Footer() {
  const socialLinks = [
    { name: 'Facebook', url: commonContent.facebook, icon: <Facebook className="h-5 w-5" /> },
    { name: 'Twitter', url: commonContent.twitter, icon: <Twitter className="h-5 w-5" /> },
    { name: 'Instagram', url: commonContent.instagram, icon: <Instagram className="h-5 w-5" /> },
    { name: 'LinkedIn', url: commonContent.linkedin, icon: <Linkedin className="h-5 w-5" /> },
    { name: 'YouTube', url: commonContent.youtube, icon: <Youtube className="h-5 w-5" /> }
  ]

  return (
    <footer className="bg-primary text-slate-50 border-t border-slate-600/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="">
            <Image
              src="/images/logo.png"
              alt={commonContent.companyName}
              width={160}  // Adjust based on your logo's aspect ratio
              height={160}  // Adjust based on your logo's aspect ratio
              className="h-12 w-auto -mt-8"  // Maintain aspect ratio
              priority
            />
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{commonContent.companyName}</h3>
            <p className="text-slate-100 text-sm leading-relaxed mb-4 max-w-xs">
              {commonContent.companyDescription}
            </p>
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  className="text-slate-200 hover:bg-slate-600/50 hover:text-white transition-all duration-300 hover:scale-110"
                  asChild
                >
                  <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    {social.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-5 text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3.5">
              <li><Link href="/about" className="text-sm text-slate-50 hover:text-white transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400/80 mr-2 group-hover:bg-white transition-all duration-300"></span>
                About Us
              </Link></li>
              <li><Link href="/services" className="text-sm text-slate-50 hover:text-white transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400/80 mr-2 group-hover:bg-white transition-all duration-300"></span>
                Services
              </Link></li>
              <li><Link href="/our-works" className="text-sm text-slate-50 hover:text-white transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400/80 mr-2 group-hover:bg-white transition-all duration-300"></span>
                Projects
              </Link></li>
              <li><Link href="/contact" className="text-sm text-slate-50 hover:text-white transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400/80 mr-2 group-hover:bg-white transition-all duration-300"></span>
                Contact
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-5 text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="bg-slate-700/30 p-2 rounded-lg mr-3 group-hover:bg-slate-600/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="pt-0.5">
                  <p className="text-xs text-slate-200/90 mb-0.5">Call Us</p>
                  <Link href={`tel:${commonContent.phone.replace(/\D/g, '')}`} className="text-white hover:text-white/90 transition-colors text-sm font-medium">
                    {commonContent.phone}
                  </Link>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-slate-700/30 p-2 rounded-lg mr-3 group-hover:bg-slate-600/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="pt-0.5">
                  <p className="text-xs text-slate-200/90 mb-0.5">Email Us</p>
                  <Link href={`mailto:${commonContent.Email}`} className="text-white hover:text-white/90 transition-colors text-sm font-medium break-all">
                    {commonContent.Email}
                  </Link>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-slate-700/30 p-2 rounded-lg mr-3 group-hover:bg-slate-600/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="pt-0.5">
                  <p className="text-xs text-slate-200/90 mb-0.5">Location</p>
                  <span className="text-white text-sm font-medium">{commonContent.Address}</span>
                </div>
              </li>
            </ul>
          </div>
          <Newsletter />
        </div>

        <div className="border-t border-slate-700/50 mt-12 pt-8 text-center">
          <p className="text-slate-200 text-sm">
            © {new Date().getFullYear()} {commonContent.companyName}. All rights reserved.
          </p>
          <p className="mt-2 text-slate-300 text-xs">
            Powered by{' '}
            <a
              href="https://www.tsglobaltech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-100 hover:text-white transition-colors font-medium underline underline-offset-4 decoration-slate-400/50 hover:decoration-slate-300"
            >
              TS GLOBAL TECH PVT. LTD.
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
