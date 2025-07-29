import { Header } from "@/components/header"
import { About } from "@/components/about"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Poyrazköy Balıkçısı'nın hikayesi, misyonu ve vizyonu. 1985'ten beri İstanbul Boğazı'nda hizmet veren aile işletmesi restoranımızın geçmişi ve değerleri.",
  keywords: ["hakkımızda", "hikaye", "aile işletmesi", "Poyrazköy Balıkçısı", "restoran hikayesi", "deneyim"],
  openGraph: {
    title: "Hakkımızda - Poyrazköy Balıkçısı",
    description: "1985'ten beri İstanbul Boğazı'nda hizmet veren aile işletmesi restoranımızın hikayesi ve değerleri.",
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <About />
    </main>
  )
}
