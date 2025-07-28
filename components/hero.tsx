"use client"

import { Button } from "@/components/ui/button"
import { Fish, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 overflow-hidden"
    >
      {/* Video background */}
      <video
      className="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none"
      src="/hero-bg-fixed.mp4"
      autoPlay
      loop
      muted
      playsInline
      style={{ width: '100vw', objectFit: 'cover' }}
    />

      <div className="absolute inset-0 bg-black/20 z-10" />
    

      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-64 sm:mt-48">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg"
            onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })}
          >
            Rezervasyon Yap
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-900 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg bg-transparent"
            onClick={() => router.push("/menu")}
          >
            Menüyü Görüntüle
          </Button>
        </div>

        <div className="mt-8 sm:mt-12 flex items-center justify-center text-blue-200">
          <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
          <span className="text-base sm:text-lg">(555) 123-FISH</span>
        </div>
      </div>
    </section>
  )
}
