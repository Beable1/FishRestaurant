import { Header } from "@/components/header"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Gallery />
      <Contact />
    </main>
  )
}
