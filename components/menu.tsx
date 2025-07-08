"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChefHat, Fish, Utensils, Beef, Waves, Grid3X3, ChevronLeft, ChevronRight } from "lucide-react"

const menuItems = [
  {
    category: "Appetizers & Small Plates",
    id: "appetizers",
    icon: ChefHat,
    color: "from-orange-400 to-red-500",
    items: [
      {
        name: "New England Clam Chowder",
        description: "Creamy traditional chowder with tender clams and fresh herbs",
        price: "$12",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Coconut Shrimp",
        description: "Jumbo shrimp in crispy coconut coating with mango dipping sauce",
        price: "$16",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Crab Cakes",
        description: "Maryland-style crab cakes with remoulade sauce",
        price: "$18",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Stuffed Mushrooms",
        description: "Button mushrooms stuffed with crab meat and herbs",
        price: "$14",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    category: "Raw Bar & Sashimi",
    id: "raw-bar",
    icon: Waves,
    color: "from-blue-400 to-cyan-500",
    items: [
      {
        name: "Oyster Selection",
        description: "Daily selection of East and West coast oysters",
        price: "$3-5 each",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Seafood Tower",
        description: "Lobster, crab, shrimp, oysters, and clams for two",
        price: "$85",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Tuna Sashimi",
        description: "Fresh yellowfin tuna with wasabi, pickled ginger, and soy",
        price: "$22",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Salmon Tartare",
        description: "Fresh salmon with avocado and citrus dressing",
        price: "$20",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    category: "Signature Entrees",
    id: "entrees",
    icon: Fish,
    color: "from-emerald-400 to-teal-500",
    items: [
      {
        name: "Grilled Atlantic Salmon",
        description: "Fresh Atlantic salmon with lemon herb butter and seasonal vegetables",
        price: "$28",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Lobster Thermidor",
        description: "Classic preparation with cognac cream sauce, served with rice pilaf",
        price: "$45",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Pan-Seared Halibut",
        description: "Alaskan halibut with roasted tomato coulis and grilled asparagus",
        price: "$32",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Grilled Sea Bass",
        description: "Mediterranean sea bass with olive tapenade",
        price: "$30",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    category: "Pasta & Risotto",
    id: "pasta",
    icon: Utensils,
    color: "from-purple-400 to-pink-500",
    items: [
      {
        name: "Seafood Linguine",
        description: "Fresh linguine with shrimp, scallops, mussels in white wine sauce",
        price: "$26",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Lobster Risotto",
        description: "Creamy arborio rice with fresh lobster meat and herbs",
        price: "$34",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Cioppino",
        description: "San Francisco-style seafood stew with sourdough bread",
        price: "$29",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Crab Ravioli",
        description: "Handmade ravioli filled with fresh crab meat",
        price: "$28",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    category: "Land & Sea",
    id: "land-sea",
    icon: Beef,
    color: "from-amber-400 to-orange-500",
    items: [
      {
        name: "Surf & Turf",
        description: "Grilled filet mignon with lobster tail and garlic mashed potatoes",
        price: "$52",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Blackened Chicken",
        description: "Cajun-spiced chicken breast with coconut rice and vegetables",
        price: "$24",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Grilled Ribeye",
        description: "12oz ribeye steak with herb butter and roasted vegetables",
        price: "$38",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Lamb Chops",
        description: "Herb-crusted lamb chops with mint sauce",
        price: "$42",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
]

function CategorySlider({ category }: { category: (typeof menuItems)[0] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, category.items.length - itemsPerView.desktop) : prevIndex - 1,
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= category.items.length - itemsPerView.desktop ? 0 : prevIndex + 1))
  }

  return (
    <div className="relative">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6 p-4 lg:p-6 bg-gradient-to-r from-white to-slate-50 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full bg-gradient-to-r ${category.color}`}>
            <category.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-slate-800">{category.category}</h3>
            <p className="text-slate-600 text-sm lg:text-base">{category.items.length} delicious options</p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="h-10 w-10 rounded-full border-slate-300 hover:bg-slate-50 bg-transparent"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="h-10 w-10 rounded-full border-slate-300 hover:bg-slate-50 bg-transparent"
            disabled={currentIndex >= category.items.length - itemsPerView.desktop}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4 lg:gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`,
          }}
        >
          {category.items.map((item) => (
            <div key={item.name} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-0 shadow-lg h-full">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 lg:h-56 object-cover"
                  />
                  {item.popular && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                      Popular
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg lg:text-xl text-slate-800 font-bold leading-tight">
                      {item.name}
                    </CardTitle>
                    <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent flex-shrink-0">
                      {item.price}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed text-sm lg:text-base">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center mt-6 gap-2 sm:hidden">
        {Array.from({ length: Math.ceil(category.items.length / itemsPerView.mobile) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-600 scale-125" : "bg-slate-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCategories = selectedCategory
    ? menuItems.filter((category) => category.id === selectedCategory)
    : menuItems

  return (
    <section id="menu" className="py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
            Our Menu
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of the finest seafood, prepared with passion and served with pride.
          </p>
        </div>

        {/* Category Filter - Mobile Responsive */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-12 lg:mb-16">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold transition-all duration-300 text-sm lg:text-base ${
              selectedCategory === null
                ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg transform scale-105"
                : "hover:bg-blue-50 hover:border-blue-300"
            }`}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            All Categories
          </Button>
          {menuItems.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold transition-all duration-300 text-sm lg:text-base ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                  : "hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              <category.icon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{category.category}</span>
              <span className="sm:hidden">{category.category.split(" ")[0]}</span>
            </Button>
          ))}
        </div>

        {/* Menu Categories with Sliders */}
        <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
          {filteredCategories.map((category) => (
            <div key={category.id} className="scroll-mt-8">
              <CategorySlider category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
