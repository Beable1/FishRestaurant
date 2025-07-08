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
    alt: "Grilled Atlantic Salmon",
    category: "food",
    title: "Grilled Atlantic Salmon",
    description: "Fresh Atlantic salmon with lemon herb butter",
    featured: true,
  },
  {
    id: "2",
    src: "/placeholder.svg?height=300&width=400",
    alt: "Restaurant Interior",
    category: "restaurant",
    title: "Elegant Dining Room",
    description: "Our beautifully appointed main dining area",
  },
  {
    id: "3",
    src: "/placeholder.svg?height=500&width=400",
    alt: "Lobster Thermidor",
    category: "food",
    title: "Lobster Thermidor",
    description: "Classic preparation with cognac cream sauce",
    featured: true,
  },
  {
    id: "4",
    src: "/placeholder.svg?height=300&width=500",
    alt: "Waterfront Terrace",
    category: "restaurant",
    title: "Waterfront Terrace",
    description: "Dining with stunning ocean views",
  },
  {
    id: "5",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Chef at Work",
    category: "chef",
    title: "Chef Martinez",
    description: "Our head chef preparing the daily catch",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=350&width=500",
    alt: "Seafood Tower",
    category: "food",
    title: "Seafood Tower",
    description: "Fresh oysters, lobster, and seasonal shellfish",
  },
  {
    id: "7",
    src: "/placeholder.svg?height=400&width=300",
    alt: "Private Event",
    category: "events",
    title: "Wedding Reception",
    description: "Celebrating special moments by the sea",
  },
  {
    id: "8",
    src: "/placeholder.svg?height=300&width=400",
    alt: "Bar Area",
    category: "restaurant",
    title: "Cocktail Bar",
    description: "Craft cocktails and fine wines",
  },
  {
    id: "9",
    src: "/placeholder.svg?height=450&width=400",
    alt: "Pan-Seared Halibut",
    category: "food",
    title: "Pan-Seared Halibut",
    description: "Alaskan halibut with roasted vegetables",
  },
  {
    id: "10",
    src: "/placeholder.svg?height=300&width=600",
    alt: "Sunset Dining",
    category: "restaurant",
    title: "Sunset Views",
    description: "Romantic dining as the sun sets over the harbor",
  },
  {
    id: "11",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Corporate Event",
    category: "events",
    title: "Business Dinner",
    description: "Professional gatherings in elegant surroundings",
  },
  {
    id: "12",
    src: "/placeholder.svg?height=350&width=400",
    alt: "Kitchen Team",
    category: "chef",
    title: "Culinary Team",
    description: "Our passionate kitchen staff",
  },
]

const categories = [
  { id: "all", label: "All Photos", count: galleryImages.length },
  { id: "food", label: "Our Dishes", count: galleryImages.filter((img) => img.category === "food").length },
  { id: "restaurant", label: "Restaurant", count: galleryImages.filter((img) => img.category === "restaurant").length },
  { id: "events", label: "Events", count: galleryImages.filter((img) => img.category === "events").length },
  { id: "chef", label: "Our Team", count: galleryImages.filter((img) => img.category === "chef").length },
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
              Photo Gallery
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore the beauty of Ocean's Catch through our curated collection of moments, flavors, and experiences
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${getGridClass(index)}`}
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                  {image.description && <p className="text-sm opacity-90">{image.description}</p>}
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Featured Badge */}
              {image.featured && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                  Featured
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute -top-12 right-0 bg-white/10 border-white/20 text-white hover:bg-white/20 z-10"
                onClick={closeLightbox}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* Image */}
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
                {selectedImage.description && <p className="text-white/90 text-lg">{selectedImage.description}</p>}
                <div className="flex items-center justify-between mt-4">
                  <Badge className="bg-white/20 text-white">
                    {categories.find((cat) => cat.id === selectedImage.category)?.label}
                  </Badge>
                  <span className="text-white/70 text-sm">
                    {currentImageIndex + 1} of {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
