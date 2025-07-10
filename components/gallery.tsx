"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: "food" | "restaurant" | "events" | "chef"
  title: string
  description?: string
  featured?: boolean
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Izgara Atlantik Somonu",
    category: "food",
    title: "Izgara Atlantik Somonu",
    description: "Limon otlu tereyağı ile taze Atlantik somonu",
    featured: true,
  },
  {
    id: "2",
    src: "/placeholder.svg?height=300&width=400",
    alt: "Restoran İç Mekanı",
    category: "restaurant",
    title: "Zarif Yemek Salonu",
    description: "Güzelce döşenmiş ana yemek alanımız",
  },
  {
    id: "3",
    src: "/placeholder.svg?height=500&width=400",
    alt: "Istakoz Thermidor",
    category: "food",
    title: "Istakoz Thermidor",
    description: "Konyak kremalı sos ile klasik hazırlama",
    featured: true,
  },
  {
    id: "4",
    src: "/placeholder.svg?height=300&width=500",
    alt: "Sahil Terası",
    category: "restaurant",
    title: "Sahil Terası",
    description: "Muhteşem okyanus manzarası ile yemek",
  },
  {
    id: "5",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Çalışan Şef",
    category: "chef",
    title: "Şef Martinez",
    description: "Günün avını hazırlayan baş şefimiz",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=350&width=500",
    alt: "Deniz Ürünleri Kulesi",
    category: "food",
    title: "Deniz Ürünleri Kulesi",
    description: "Taze istiridyeler, ıstakoz ve mevsim kabukluları",
  },
  {
    id: "7",
    src: "/placeholder.svg?height=400&width=300",
    alt: "Özel Etkinlik",
    category: "events",
    title: "Düğün Resepsiyonu",
    description: "Deniz kenarında özel anları kutlama",
  },
  {
    id: "8",
    src: "/placeholder.svg?height=300&width=400",
    alt: "Bar Alanı",
    category: "restaurant",
    title: "Kokteyl Bar",
    description: "El yapımı kokteyller ve kaliteli şaraplar",
  },
  {
    id: "9",
    src: "/placeholder.svg?height=450&width=400",
    alt: "Tavada Halibut",
    category: "food",
    title: "Tavada Halibut",
    description: "Kızarmış sebzeler ile Alaska halibutu",
  },
  {
    id: "10",
    src: "/placeholder.svg?height=300&width=600",
    alt: "Gün Batımı Yemeği",
    category: "restaurant",
    title: "Gün Batımı Manzarası",
    description: "Liman üzerinde güneş batarken romantik yemek",
  },
  {
    id: "11",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Kurumsal Etkinlik",
    category: "events",
    title: "İş Yemeği",
    description: "Zarif ortamda profesyonel toplantılar",
  },
  {
    id: "12",
    src: "/placeholder.svg?height=350&width=400",
    alt: "Mutfak Ekibi",
    category: "chef",
    title: "Mutfak Ekibi",
    description: "Tutkulu mutfak personelimiz",
  },
]

const categories = [
  { id: "all", label: "Tüm Fotoğraflar", count: galleryImages.length },
  { id: "food", label: "Yemeklerimiz", count: galleryImages.filter((img) => img.category === "food").length },
  { id: "restaurant", label: "Restoran", count: galleryImages.filter((img) => img.category === "restaurant").length },
  { id: "events", label: "Etkinlikler", count: galleryImages.filter((img) => img.category === "events").length },
  { id: "chef", label: "Ekibimiz", count: galleryImages.filter((img) => img.category === "chef").length },
]

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    setCurrentImageIndex(filteredImages.findIndex((img) => img.id === image.id))
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const getGridClass = (index: number) => {
    // Create a varied grid layout
    const patterns = [
      "md:col-span-2 md:row-span-2", // Large square
      "md:col-span-1 md:row-span-1", // Small
      "md:col-span-1 md:row-span-2", // Tall
      "md:col-span-2 md:row-span-1", // Wide
      "md:col-span-1 md:row-span-1", // Small
      "md:col-span-1 md:row-span-1", // Small
    ]
    return patterns[index % patterns.length]
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Camera className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
              Fotoğraf Galerisi
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Özenle seçilmiş anlar, lezzetler ve deneyimler koleksiyonumuzla Poyrazköy Balıkçısı'nın güzelliğini keşfedin
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg transform scale-105"
                  : "hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 bg-white/20 text-current">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${getGridClass(index)}`}
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                {image.description && (
                  <p className="text-sm text-blue-100">{image.description}</p>
                )}
              </div>
              {image.featured && (
                <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                  Öne Çıkan
                </Badge>
              )}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="h-6 w-6 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={closeLightbox}
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-blue-200">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
