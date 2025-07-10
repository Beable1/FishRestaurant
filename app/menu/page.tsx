import { Header } from "@/components/header"
import { Menu } from "@/components/menu"
import { Contact } from "@/components/contact"

export default function MenuPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Menu />
      <Contact />
    </main>
  )
}
