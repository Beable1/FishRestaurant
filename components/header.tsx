"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Fish, Phone, MapPin, Clock, Menu, X, Instagram } from "lucide-react"
import Image from "next/image"

import { useRouter, usePathname } from "next/navigation"


export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const router = useRouter()

  const pathname = usePathname()

  const navigationItems = [
    { label: "Ana Sayfa", section: "hero", href: "/#hero" },
    { label: "Hakkımızda", href: "/about" },
    { label: "Galeri", href: "/gallery" },
    { label: "Menü", href: "https://view.qrall.co/tr?tenantId=3a17002c-05ec-8d85-f2fe-1b5946e9ad7d&channelId=3a17002c-50bf-5261-7a37-fbe11e8c48fc", external: true },
    { label: "Rezervasyon", section: "reservation", href: "/#reservation" },
    { label: "İletişim", href: "/contact" },

  ]

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-800 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>0216 320 11 73</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Poyraz, Mendirek Yolu No:14, Beykoz</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Her Gün Açık 17:00 - 23:00</span>
            </div>
            <button
              className="text-white hover:text-blue-200 transition-colors"
              onClick={() => window.open('https://instagram.com/poyrazkoybalikcisi/', '_blank')}
            >
              <Instagram className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}>
              <div className="relative">
                <div className="absolute  p-6 ml-6"></div>
                

                 <Image
                    src="/logo.jpg"
                    alt="Fish Restaurant logosu"
                    width={192}      // en yüksek olası genişlik
                    height={64}
                    className="w-24 sm:w-32 md:w-32 lg:w-32 h-auto
                                    /* her yanda margin */
                              p-2 sm:p-3"     /* iç boşluk (padding) */

                    priority
                  />
              </div>
              {/* < 768 px'te gizli, ≥ 768 px'te blok eleman */}
                <div className="hidden md:block">
                  <h1 className="text-2xl md:text-3xl font-bold
                                bg-gradient-to-r from-blue-600 to-teal-600
                                bg-clip-text text-transparent">
                    Poyrazköy Balıkçısı
                  </h1>

                  {/* İstersen tagline da yalnızca md+ görünür: */}
                  {/* <p className="text-xs text-slate-500 -mt-1">Taze Deniz Ürünleri Restoranı</p> */}
                </div>

            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}

                  onClick={() => {
                    if (item.external) {
                      window.open(item.href, '_blank')
                    } else if (item.section) {
                      if (pathname === "/") {
                        scrollToSection(item.section)
                      } else {
                        router.push(item.href)
                      }
                    } else {
                      router.push(item.href)
                    }
                  }}

                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button

                onClick={() => {
                  if (pathname === "/") {
                    scrollToSection("reservation")
                  } else {
                    router.push("/#reservation")
                  }
                }}

                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Masa Rezervasyonu
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.label}

                    onClick={() => {
                      if (item.external) {
                        window.open(item.href, '_blank')
                      } else if (item.section) {
                        if (pathname === "/") {
                          scrollToSection(item.section)
                        } else {
                          router.push(item.href)
                        }
                      } else {
                        router.push(item.href)
                      }
                      setIsMobileMenuOpen(false)
                    }}

                    className="text-left text-slate-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-slate-200">
                  <Button
                    onClick={() => {

                      if (pathname === "/") {
                        scrollToSection("reservation")
                      } else {
                        router.push("/#reservation")
                      }

                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 rounded-lg font-semibold shadow-lg"
                  >
                    Masa Rezervasyonu
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Contact Buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <Button
          size="sm"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg"
          onClick={() => window.open('https://wa.me/905318409312', '_blank')}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </Button>
        <Button
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg"
          onClick={() => window.open('tel:02163201173', '_self')}
        >
          <Phone className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
