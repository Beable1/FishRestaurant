import { Header } from "@/components/header"
import { Menu } from "@/components/menu"
import { Contact } from "@/components/contact"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Menü",
  description: "Poyrazköy Balıkçısı menüsü - Taze balık çeşitleri, deniz ürünleri, özel mezeler ve içecekler. Günlük taze balık seçenekleri ve fiyatları.",
  keywords: ["menü", "balık çeşitleri", "deniz ürünleri", "mezeler", "taze balık", "fiyatlar", "yemek listesi"],
  openGraph: {
    title: "Menü - Poyrazköy Balıkçısı",
    description: "Taze balık çeşitleri, deniz ürünleri, özel mezeler ve içecekler. Günlük taze balık seçenekleri ve fiyatları.",
  }
}

export default function MenuPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Menu />
      <Contact />
    </main>
  )
}
