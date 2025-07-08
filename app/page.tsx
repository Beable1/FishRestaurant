import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { FeaturedSection } from "@/components/featured-section"
import { Gallery } from "@/components/gallery"
import { Menu } from "@/components/menu"
import { Reservation } from "@/components/reservation"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <FeaturedSection />
      <Gallery />
      <Menu />
      <Reservation />
      <Contact />
    </main>
  )
}
