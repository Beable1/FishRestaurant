"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface CarouselItem {
  id: string
  type: "dish" | "image" | "testimonial"
  title: string
  description?: string
  image: string
  price?: string
  rating?: number
  author?: string
  popular?: boolean
}

interface CarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
}

export function Carousel({
  items,
  autoPlay = true,
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isHovered, items.length])

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Navigate to previous slide
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  // Navigate to next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  const renderCarouselItem = (item: CarouselItem) => {
    switch (item.type) {
      case "dish":
        return (
          <Card className="overflow-hidden bg-white shadow-xl border-0 h-full">
            <div className="relative">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
              {item.popular && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  Popüler
                </Badge>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-slate-800">{item.title}</h3>
                {item.price && (
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    {item.price}
                  </span>
                )}
              </div>
              {item.description && <p className="text-slate-600 leading-relaxed">{item.description}</p>}
              {item.rating && (
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < item.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-slate-600">({item.rating}/5)</span>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case "image":
        return (
          <div className="relative h-full rounded-2xl overflow-hidden">
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
              {item.description && <p className="text-lg opacity-90">{item.description}</p>}
            </div>
          </div>
        )

      case "testimonial":
        return (
          <Card className="bg-gradient-to-br from-blue-50 to-white shadow-xl border-0 h-full flex flex-col justify-center">
            <CardContent className="p-8 text-center">
              <Quote className="h-12 w-12 text-blue-400 mx-auto mb-6" />
              <blockquote className="text-xl text-slate-700 leading-relaxed mb-6 italic">
                "{item.description}"
              </blockquote>
              <div className="flex items-center justify-center mb-4">
                {item.rating && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < item.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </>
                )}
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-slate-800">{item.author}</p>
                  <p className="text-slate-600 text-sm">{item.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-2xl" ref={carouselRef}>
        <div
          className="flex transition-transform duration-500 ease-in-out h-96"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0 px-2">
              {renderCarouselItem(item)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && items.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 z-10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 z-10"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-600 scale-125" : "bg-slate-300 hover:bg-slate-400"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Sample data for different carousel types
export const featuredDishes: CarouselItem[] = [
  {
    id: "1",
    type: "dish",
    title: "Izgara Atlantik Somonu",
    description: "Limon otlu tereyağı ve mevsim sebzeleri ile taze Atlantik somonu",
    image: "/placeholder.svg?height=300&width=400",
    price: "$28",
    rating: 5,
    popular: true,
  },
  {
    id: "2",
    type: "dish",
    title: "Istakoz Thermidor",
    description: "Konyak kremalı sos ile klasik hazırlama, pilav pilavı ile servis",
    image: "/placeholder.svg?height=300&width=400",
    price: "$45",
    rating: 5,
    popular: true,
  },
  {
    id: "3",
    type: "dish",
    title: "Minakop",
    description: "Tavada kızartılmış minakop",
    image: "/dishes/minakop.png",
    price: "$85",
    rating: 5,
  },
]

export const restaurantImages: CarouselItem[] = [
  {
    id: "1",
    type: "image",
    title: "Zarif Yemek Salonu",
    description: "Güzelce döşenmiş ana yemek salonumuzda lüks yemek deneyimi yaşayın",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    type: "image",
    title: "Sahil Terası",
    description: "Dış mekan terasımızda muhteşem okyanus manzarası ile yemeğinizin tadını çıkarın",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    type: "image",
    title: "Özel Yemek",
    description: "Özel etkinliklerinizi samimi özel yemek alanlarımızda düzenleyin",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export const customerTestimonials: CarouselItem[] = [
  {
    id: "1",
    type: "testimonial",
    title: "Yemek Eleştirmeni",
    description:
      "Poyrazköy Balıkçısı en taze deniz ürünleri ve kusursuz hizmetle olağanüstü bir yemek deneyimi sunuyor. Sahildeki gerçek bir mücevher.",
    image: "/placeholder.svg?height=100&width=100",
    author: "Sarah Johnson",
    rating: 5,
  },
  {
    id: "2",
    type: "testimonial",
    title: "Düzenli Müşteri",
    description:
      "Yıllardır buraya geliyorum ve hiç hayal kırıklığına uğratmıyor. Istakoz thermidor kesinlikle ilahi ve personel sizi aile gibi karşılıyor.",
    image: "/placeholder.svg?height=100&width=100",
    author: "Michael Chen",
    rating: 5,
  },
  {
    id: "3",
    type: "testimonial",
    title: "Düğün Misafiri",
    description:
      "Düğün resepsiyonumuzu burada yaptık ve mükemmeldi. Yemek olağanüstüydü ve sahil manzarası özel günümüzü unutulmaz kıldı.",
    image: "/placeholder.svg?height=100&width=100",
    author: "Emily Rodriguez",
    rating: 5,
  },
]
