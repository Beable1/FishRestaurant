"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Fish, Phone, MapPin, Clock, Menu, X } from "lucide-react"
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
    { label: "Hakkımızda", section: "about", href: "/#about" },
    { label: "Galeri", href: "/gallery" },
    { label: "Menü", href: "/menu" },
    { label: "Rezervasyon", section: "reservation", href: "/#reservation" },
    { label: "İletişim", section: "contact", href: "/#contact" },

  ]

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-800 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>(555) 123-FISH</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>123 Harbor View Drive, Seaside Bay</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Her Gün Açık 17:00 - 23:00</span>
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full blur-lg opacity-50 animate-pulse p-6 ml-6"></div>
                

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
                  <p className="text-xs text-slate-500 -mt-1">Taze Deniz Ürünleri Restoranı</p>
                </div>

            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}

                  onClick={() => {
                    if (item.section) {
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
                      if (item.section) {
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
    </>
  )
}
