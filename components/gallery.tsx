"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

interface GalleryImage {
  id: string
  imageUrl: string
  alt: string
  category: "food" | "restaurant" | "events" | "chef"
  title: string
  description?: string
  featured?: boolean
}

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    async function fetchImages() {
      setLoading(true)
      try {
        const snapshot = await getDocs(collection(db, "gallery"))
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryImage[]
        setImages(data)
      } catch (err) {
        setImages([])
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  const categories = [
    { id: "all", label: "Tüm Fotoğraflar", count: images.length },
    { id: "food", label: "Yemeklerimiz", count: images.filter((img) => img.category === "food").length },
    { id: "restaurant", label: "Restoran", count: images.filter((img) => img.category === "restaurant").length },
    { id: "events", label: "Etkinlikler", count: images.filter((img) => img.category === "events").length },
    { id: "chef", label: "Ekibimiz", count: images.filter((img) => img.category === "chef").length },
  ]

  const filteredImages =
    selectedCategory === "all" ? images : images.filter((img) => img.category === selectedCategory)

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
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Yükleniyor...</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-lg">Henüz galeriye fotoğraf eklenmedi.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[180px]">
            {filteredImages.map((img, i) => (
              <div
                key={img.id}
                className={`relative group cursor-pointer overflow-hidden rounded-xl shadow-lg bg-white ${getGridClass(i)}`}
                onClick={() => openLightbox(img)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.alt || img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {img.featured && (
                  <Badge className="absolute top-3 left-3 bg-orange-500">Öne Çıkan</Badge>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{img.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">{img.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
              <button
                className="absolute top-4 right-4 text-slate-700 hover:text-red-600 z-10"
                onClick={closeLightbox}
                aria-label="Kapat"
              >
                <X className="h-7 w-7" />
              </button>
              <div className="flex items-center justify-between px-6 pt-6">
                <button onClick={goToPrevious} className="text-slate-700 hover:text-blue-600">
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <div className="flex-1 flex flex-col items-center">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.alt || selectedImage.title}
                    className="max-h-[60vh] w-auto object-contain rounded-lg"
                  />
                  <h3 className="text-xl font-bold text-slate-800 mt-4 mb-1">{selectedImage.title}</h3>
                  <p className="text-slate-600 text-center mb-2">{selectedImage.description}</p>
                  {selectedImage.featured && <Badge className="bg-orange-500">Öne Çıkan</Badge>}
                </div>
                <button onClick={goToNext} className="text-slate-700 hover:text-blue-600">
                  <ChevronRight className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
