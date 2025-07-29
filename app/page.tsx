import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedSection } from "@/components/featured-section"
import { Reservation } from "@/components/reservation"
import { Contact } from "@/components/contact"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description: "Poyrazköy Balıkçısı - İstanbul Boğazı'nda eşsiz manzara eşliğinde taze balık ve deniz ürünleri sunan aile işletmesi restoran. En taze balıklar, özel mezeler ve unutulmaz deneyim.",
  keywords: ["ana sayfa", "balık restoranı", "Poyrazköy", "taze balık", "Boğaz manzarası", "özel menü"],
  openGraph: {
    title: "Poyrazköy Balıkçısı - Ana Sayfa",
    description: "İstanbul Boğazı'nda eşsiz manzara eşliğinde taze balık ve deniz ürünleri sunan aile işletmesi restoran.",
  }
}

export default function Home() {
  return (
    <main className="min-h-screen">
      
      <Header />
      <Hero />
      <FeaturedSection />
      <Reservation />
      <Contact />
    </main>
  )
}
