import { Header } from "@/components/header"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Galeri",
  description: "Poyrazköy Balıkçısı galeri - Restoranımızdan, yemeklerimizden ve Boğaz manzarasından fotoğraflar. Atmosferimizi keşfedin.",
  keywords: ["galeri", "fotoğraflar", "restoran atmosferi", "yemek fotoğrafları", "Boğaz manzarası", "deneyim"],
  openGraph: {
    title: "Galeri - Poyrazköy Balıkçısı",
    description: "Restoranımızdan, yemeklerimizden ve Boğaz manzarasından fotoğraflar. Atmosferimizi keşfedin.",
  }
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Gallery />
      <Contact />
    </main>
  )
}
