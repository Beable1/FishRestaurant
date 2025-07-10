import { Header } from "@/components/header"
import { Contact } from "@/components/contact"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReservationConfirmedPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-8">
        <div className="text-center space-y-6 max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
            Rezervasyon Onaylandı
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            Rezervasyonunuzu onayladığınız için teşekkürler. Sizi ağırlamayı sabırsızlıkla bekliyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Ana Sayfaya Dön</Button>
            </Link>
            <Link href="/#reservation">
              <Button size="lg" variant="outline">Başka Rezervasyon</Button>
            </Link>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  )
}
