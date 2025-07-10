"use client"

import { Button } from "@/components/ui/button"
import { Fish, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Fish className="h-16 w-16 text-blue-200 mr-4" />
          <h1 className="text-5xl md:text-7xl font-bold">Okyanus'un Avı</h1>
        </div>

        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Zarif bir sahil manzarasında en taze deniz ürünlerinin tadını çıkarın. Okyanustan masaya, günün avını tutku ve uzmanlıkla servis ediyoruz.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })}
          >
            Rezervasyon Yap
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg bg-transparent"
            onClick={() => router.push("/menu")}
          >
            Menüyü Görüntüle
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center text-blue-200">
          <Phone className="h-5 w-5 mr-2" />
          <span className="text-lg">(555) 123-FISH</span>
        </div>
      </div>
    </section>
  )
}
