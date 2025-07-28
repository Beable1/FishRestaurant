"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChefHat, Fish, Utensils, Beef, Waves, Grid3X3, ChevronLeft, ChevronRight } from "lucide-react"

const menuItems = [
	{
		category: "Başlangıçlar & Küçük Porsiyonlar",
		id: "appetizers",
		icon: ChefHat,
		color: "from-orange-400 to-red-500",
		items: [
			{
				name: "New England İstiridye Çorbası",
				description: "Tender istiridyeler ve taze otlarla geleneksel kremalı çorba",
				price: "$12",
				image: "/placeholder.svg?height=200&width=300",
				popular: true,
			},
			{
				name: "Hindistan Cevizli Karides",
				description: "Mango soslu çıtır hindistan cevizi kaplamasında jumbo karides",
				price: "$16",
				image: "/placeholder.svg?height=200&width=300",
			},
			{
				name: "Yengeç Köftesi",
				description: "Remoulade soslu Maryland tarzı yengeç köftesi",
				price: "$18",
				image: "/placeholder.svg?height=200&width=300",
				popular: true,
			},
			{
				name: "Doldurulmuş Mantar",
				description: "Yengeç eti ve otlarla doldurulmuş düğme mantarları",
				price: "$14",
				image: "/placeholder.svg?height=200&width=300",
			},
		],
	},
	{
		category: "Çiğ Bar & Sashimi",
		id: "raw-bar",
		icon: Waves,
		color: "from-blue-400 to-cyan-500",
		items: [
			{
				name: "İstiridye Seçimi",
				description: "Doğu ve Batı kıyısı istiridyelerinin günlük seçimi",
				price: "$3-5 adet",
				image: "/placeholder.svg?height=200&width=300",
			},
			{
				name: "Deniz Ürünleri Kulesi",
				description: "İki kişilik ıstakoz, yengeç, karides, istiridye ve midye",
				price: "$85",
				image: "/placeholder.svg?height=200&width=300",
				popular: true,
			},
			{
				name: "Ton Balığı Sashimi",
				description: "Wasabi, turşu zencefil ve soya ile taze sarı yüzgeçli ton balığı",
				price: "$22",
				image: "/placeholder.svg?height=200&width=300",
			},
			{
				name: "Somon Tartar",
				description: "Avokado ve narenciye sosu ile taze somon",
				price: "$20",
				image: "/placeholder.svg?height=200&width=300",
			},
		],
	},
	{
		category: "Özel Ana Yemekler",
		id: "entrees",
		icon: Fish,
		color: "from-emerald-400 to-teal-500",
		items: [
			{
				name: "Izgara Atlantik Somonu",
				description: "Limon otlu tereyağı ve mevsim sebzeleri ile taze Atlantik somonu",
				price: "$28",
				image: "/placeholder.svg?height=200&width=300",
				popular: true,
			},
			{
				name: "Istakoz Thermidor",
				description: "Konyak kremalı sos ile klasik hazırlama, pilav pilavı ile servis",
				price: "$45",
				image: "/placeholder.svg?height=200&width=300",
				popular: true,
			},
			{
				name: "Tavada Halibut",
				description: "Kızarmış domates koulis ve ızgara kuşkonmaz ile Alaska halibutu",
				price: "$32",
				image: "/placeholder.svg?height=200&width=300",
				popular: true,
			},
			{
				name: "Izgara Deniz Levreği",
				description: "Zeytin tapenad ile Akdeniz deniz levreği",
				price: "$30",
				image: "/placeholder.svg?height=200&width=300",
			},
		],
	},
	{
		category: "Makarna & Risotto",
		id: "pasta",
		icon: Utensils,
		color: "from-purple-400 to-pink-500",
		items: [
			{
				name: "Deniz Ürünleri Linguine",
				description: "Beyaz şarap sosunda karides, tarak, midye ile taze linguine",
				price: "$26",
				image: "/placeholder.svg?height=200&width=300",
			},
			{
				name: "Istakoz Risotto",
				description: "Taze ıstakoz eti ve otlarla kremalı arborio pirinci",
				price: "$34",
				image: "/placeholder.svg?height=200&width=300",
				popular: true,
			},
			{
				name: "Cioppino",
				description: "Ekşi maya ekmek ile San Francisco tarzı deniz ürünleri güveci",
				price: "$29",
				image: "/placeholder.svg?height=200&width=300",
			},
			{
				name: "Yengeç Ravioli",
				description: "Taze yengeç eti ile doldurulmuş el yapımı ravioli",
				price: "$28",
				image: "/placeholder.svg?height=200&width=300",
			},
		],
	},
	{
		category: "Kara & Deniz",
		id: "land-sea",
		icon: Beef,
		color: "from-amber-400 to-orange-500",
		items: [
			{
				name: "Surf & Turf",
				description: "Sarımsaklı patates püresi ve ıstakoz kuyruğu ile ızgara fileto mignon",
				price: "$52",
				image: "/placeholder.svg?height=200&width=300",
			},
			{
				name: "Kajun Tavuk",
				description: "Hindistan cevizi pirinci ve sebzeler ile Cajun baharatlı tavuk göğsü",
				price: "$24",
				image: "/placeholder.svg?height=200&width=300",
			},
			{
				name: "Izgara Ribeye",
				description: "Otlu tereyağı ve kızarmış sebzeler ile 12oz ribeye biftek",
				price: "$38",
				image: "/placeholder.svg?height=200&width=300",
			},
			{
				name: "Kuzu Pirzola",
				description: "Nane sosu ile ot kaplı kuzu pirzolaları",
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
				<div className="flex items-center space-x-3">
					<div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
						<category.icon className="h-6 w-6 text-white" />
					</div>
					<div>
						<h3 className="text-xl lg:text-2xl font-bold text-slate-800">{category.category}</h3>
						<p className="text-slate-600 text-sm">{category.items.length} seçenek</p>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={goToPrevious}
						className="rounded-full w-8 h-8 p-0"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={goToNext}
						className="rounded-full w-8 h-8 p-0"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Menu Items Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{category.items.slice(currentIndex, currentIndex + itemsPerView.desktop).map((item, index) => (
					<Card key={item.name} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
						<div className="relative overflow-hidden rounded-t-lg">
							<img
								src={item.image}
								alt={item.name}
								className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
							/>
							{item.popular && (
								<Badge className="absolute top-3 right-3 bg-orange-500 text-white">
									Popüler
								</Badge>
							)}
						</div>
						<CardContent className="p-4">
							<div className="flex justify-between items-start mb-2">
								<h4 className="font-semibold text-slate-800 text-lg">{item.name}</h4>
								<span className="text-lg font-bold text-blue-600">{item.price}</span>
							</div>
							<p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

export function Menu() {
	const [selectedCategory, setSelectedCategory] = useState(menuItems[0])

	return (
		<section className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="flex items-center justify-center mb-6">
						<Utensils className="h-8 w-8 text-blue-600 mr-3" />
						<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
							Menümüz
						</h2>
					</div>
					<p className="text-xl text-slate-600 max-w-2xl mx-auto">
						Şefimizin özenle seçtiği en taze malzemelerle hazırlanan özel lezzetlerimizi keşfedin
					</p>
				</div>

				{/* Category Navigation */}
				<div className="flex flex-wrap justify-center gap-4 mb-12">
					{menuItems.map((category) => (
						<Button
							key={category.id}
							variant={selectedCategory.id === category.id ? "default" : "outline"}
							onClick={() => setSelectedCategory(category)}
							className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
								selectedCategory.id === category.id
									? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg transform scale-105"
									: "hover:bg-blue-50 hover:border-blue-300"
							}`}
						>
							<category.icon className="h-4 w-4 mr-2" />
							{category.category}
						</Button>
					))}
				</div>

				{/* Menu Content */}
				<CategorySlider category={selectedCategory} />

				{/* View Full Menu Button */}
				<div className="flex justify-center mt-10">
					<a
						href="https://view.qrall.co/tr?tenantId=3a17002c-05ec-8d85-f2fe-1b5946e9ad7d&channelId=3a17002c-50bf-5261-7a37-fbe11e8c48fc"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg rounded-full hover:scale-105 transition-transform duration-300">
							Daha Detaylı Menü Gör
						</Button>
					</a>
				</div>

				{/* Special Note */}
				<div className="text-center mt-16 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-200">
					<h3 className="text-2xl font-bold text-slate-800 mb-3">Özel Not</h3>
					<p className="text-slate-600 max-w-2xl mx-auto">
						Menümüz mevsimsel değişikliklere tabidir. Günün özel yemekleri için lütfen personelimize danışın.
						Tüm yemeklerimiz taze, yerel malzemelerle hazırlanmaktadır.
					</p>
				</div>
			</div>
		</section>
	)
}
