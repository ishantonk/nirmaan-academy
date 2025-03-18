import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { brandName, contactInfo } from "@/data/contact-info"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function SiteFooter() {
  return (
    <footer className="border-t bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <div className="container py-8 md:py-12 mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Image src="/logo.png" alt="Nirmaan academy Logo" width={100} height={100} className="w-32 h-28" />
            <div className="space-y-2 text-sm font-medium">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>{contactInfo.email}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-foreground">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-foreground">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-muted-foreground hover:text-foreground">
                  Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Subscribe to our newsletter for updates and exclusive content.</p>
              <form className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                />
                <Button
                  type="submit"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
      </div>
    </footer >
  )
}
