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
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="">
            <Image
              src="/images/logo.png"
              alt={commonContent.companyName}
              width={160}  // Adjust based on your logo's aspect ratio
              height={160}  // Adjust based on your logo's aspect ratio
              className="h-16 w-auto -mt-8"  // Maintain aspect ratio
              priority
            />
            <h3 className="text-lg font-semibold text-white">{commonContent.companyName}</h3>
            <p className="text-slate-400 text-sm">
              {commonContent.companyDescription}
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:bg-slate-800 hover:text-white"
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
            <h4 className="text-sm font-semibold mb-4 text-white">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-slate-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/projects" className="text-sm text-slate-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">CONTACT US</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">📞</span>
                <Link href={`tel:${commonContent.phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                  {commonContent.phone}
                </Link>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">✉️</span>
                <Link href={`mailto:${commonContent.Email}`} className="hover:text-white transition-colors">
                  {commonContent.Email}
                </Link>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">📍</span>
                <span className="hover:text-white transition-colors">{commonContent.Address}</span>
              </li>
            </ul>
          </div>
          <Newsletter />
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {commonContent.companyName}. All rights reserved.</p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://www.tsglobaltech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              TS GLOBAL TECH PVT. LTD.
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
