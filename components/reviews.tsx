"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageCircle, ExternalLink, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"

interface Review {
  author?: {
    name: string
    profilePhotoUri?: string
  }
  author_name?: string // Legacy format için
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
  review_url?: string // Yorum linki
  images?: string[] // Yorum resimleri
}

interface ReviewsData {
  reviews: Review[]
  rating: number
  totalRatings: number
}

interface ReviewsProps {
  placeId: string
  maxReviews?: number
}

export function Reviews({ placeId, maxReviews = 6 }: ReviewsProps) {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Fetching reviews for placeId:', placeId)
        const response = await fetch(`/api/reviews?placeId=${placeId}`)
        
        const data = await response.json()
        
        // API'den dönen cevabı console'a yazdır
        console.log('API Response:', data)
        console.log('Response Status:', response.status)
        console.log('Response Headers:', Object.fromEntries(response.headers.entries()))
        
        if (!response.ok) {
          console.error('API Error:', data)
          throw new Error(data.details || data.error || 'Yorumlar yüklenirken bir hata oluştu')
        }
        
        setReviewsData(data)
      } catch (err) {
        console.error('Error in fetchReviews:', err)
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    if (placeId) {
      fetchReviews()
    } else {
      setError('Geçerli bir Place ID gerekli')
      setLoading(false)
    }
  }, [placeId])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Avatar için fallback harf oluştur
  const getAvatarFallback = (name: string) => {
    if (!name || name === 'Misafir') return 'M'
    
    // İlk harfi al, eğer Türkçe karakter varsa düzelt
    const firstChar = name.charAt(0).toUpperCase()
    const turkishChars: { [key: string]: string } = {
      'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
    }
    
      return turkishChars[firstChar] || firstChar
}

// Resim galerisi component'i
function ReviewImages({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  return (
    <div className="mt-4">
      <div className="flex items-center mb-2">
        <ImageIcon className="h-4 w-4 text-blue-600 mr-2" />
        <span className="text-sm text-slate-600">{images.length} fotoğraf</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="relative group cursor-pointer">
            <img
              src={image}
              alt={`Yorum fotoğrafı ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
              onClick={() => setSelectedImage(index)}
            />
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-semibold">+{images.length - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={images[selectedImage]}
              alt={`Yorum fotoğrafı ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button
                  className="bg-white bg-opacity-20 text-white px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)
                  }}
                >
                  ‹
                </button>
                <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded">
                  {selectedImage + 1} / {images.length}
                </span>
                <button
                  className="bg-white bg-opacity-20 text-white px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)
                  }}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

  const reviewsPerPage = 3
  const totalPages = reviewsData ? Math.ceil(reviewsData.reviews.length / reviewsPerPage) : 0
  const startIndex = currentPage * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage
  const currentReviews = reviewsData?.reviews.slice(startIndex, endIndex) || []

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Yorumlar yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!reviewsData || reviewsData.reviews.length === 0) {
    return (
      <div className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-slate-600">Henüz yorum bulunmuyor.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
              Müşteri Yorumları
            </h2>
          </div>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              {renderStars(reviewsData.rating)}
            </div>
            <div className="text-center">
              {/* Ortalama puan kaldırıldı */}
              <div className="text-slate-600">{reviewsData.totalRatings} değerlendirme</div>
            </div>
          </div>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Müşterilerimizin deneyimlerini ve geri bildirimlerini keşfedin
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentReviews.map((review, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                                     <Avatar className="h-12 w-12">
                     <AvatarImage 
                       src={review.author?.profilePhotoUri || review.profile_photo_url} 
                       alt={review.author?.name || review.author_name || 'Misafir'} 
                     />
                     <AvatarFallback className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold">
                       {getAvatarFallback(review.author?.name || review.author_name || 'Misafir')}
                     </AvatarFallback>
                   </Avatar>
                   <div className="flex-1">
                     <h4 className="font-semibold text-slate-800">{review.author?.name || review.author_name || 'Misafir'}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-slate-500">{review.relative_time_description}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
                             <CardContent>
                 <p className="text-slate-600 text-sm leading-relaxed overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                   {review.text}
                 </p>
                 
                 {/* Yorum resimleri */}
                 {review.images && review.images.length > 0 && (
                   <ReviewImages images={review.images} />
                 )}
                 
                 {(review.review_url || review.author_url) && (
                   <a
                     href={review.review_url || review.author_url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                   >
                     <ExternalLink className="h-4 w-4 mr-1" />
                     Google'da Gör
                   </a>
                 )}
               </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Önceki
            </Button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i ? "default" : "outline"}
                  onClick={() => setCurrentPage(i)}
                  className="rounded-full w-8 h-8 p-0"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="rounded-full"
            >
              Sonraki
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* View All Reviews Button */}
        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            className="px-8 py-4 text-lg font-semibold rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            onClick={() => {
              // Google İşletme sayfasına yönlendir
              window.open(`https://www.google.com/maps/place/?q=place_id:${placeId}`, '_blank')
            }}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Tüm Yorumları Google'da Gör
          </Button>
        </div>
      </div>
    </section>
  )
} 