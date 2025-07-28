import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { FeaturedSection } from "@/components/featured-section"
import { Reservation } from "@/components/reservation"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      
      <Header />
      <Hero />
      <About />
      <FeaturedSection />
      <Reservation />
      <Contact />
    </main>
  )
}
