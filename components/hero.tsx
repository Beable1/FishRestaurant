"use client"

import { Button } from "@/components/ui/button"
import { Fish, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"

export function Hero() {
  const router = useRouter()
  const [currentVideo, setCurrentVideo] = useState(0)
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)]

  const videos = [
    "/hero-bg-fixed.mp4",
    "/Poyrazköy-ortam.MOV"
  ]

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 overflow-hidden"
    >
      {/* Video background */}
      <video
        key={currentVideo}
        ref={videoRefs[currentVideo]}
        className="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none"
        src={videos[currentVideo]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        style={{ width: '100vw', objectFit: 'cover' }}
      />

      <div className="absolute inset-0 bg-black/20 z-10" />
    

      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-80 sm:mt-64">
          <Button
            size="default"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base"
            onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })}
          >
            Rezervasyon Yap
          </Button>
          <Button
            size="default"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-900 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-transparent"
            onClick={() => router.push("/menu")}
          >
            Menüyü Görüntüle
          </Button>
        </div>

        <div className="mt-6 sm:mt-8 flex items-center justify-center text-blue-200">
          <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
          <span className="text-base sm:text-lg"> 0216 320 11 73</span>
        </div>
      </div>
    </section>
  )
}
