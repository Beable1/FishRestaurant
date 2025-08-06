import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const placeId = searchParams.get('placeId')
    
    if (!placeId) {
      return NextResponse.json({ error: 'Place ID is required' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    
    if (!apiKey) {
      console.error('Google Places API key not configured')
      return NextResponse.json({ 
        error: 'Google Places API key not configured',
        details: 'Please set GOOGLE_PLACES_API_KEY in your environment variables'
      }, { status: 500 })
    }

         // Google Places API (New) Details endpoint'ini çağır - yorumlar ve resimler için optimize edildi
     const detailsUrl = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount,photos&language=tr&reviewsSort=newest&key=${apiKey}`
    
    console.log('Fetching from Google Places API (New):', detailsUrl.replace(apiKey, '[API_KEY_HIDDEN]'))
    
    let response = await fetch(detailsUrl)
    let data = await response.json()

    console.log('Google API (New) Response Status:', data.status)
    console.log('Full API Response:', JSON.stringify(data, null, 2))

    // Eğer yeni API'den yeterli yorum gelmezse eski API'yi dene
    if (data.error || !data.reviews || data.reviews.length < 5) {
      console.log('Trying legacy Places API for more reviews...')
      
             const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,photos&language=tr&reviews_sort=newest&key=${apiKey}`
      console.log('Fetching from Google Places API (Legacy):', legacyUrl.replace(apiKey, '[API_KEY_HIDDEN]'))
      
      response = await fetch(legacyUrl)
      data = await response.json()
      
      console.log('Google API (Legacy) Response Status:', data.status)
    }

    if (data.error) {
      console.error('Google API Error:', data.error)
      return NextResponse.json({ 
        error: `Google API Error: ${data.error.code || data.error.status}`,
        details: data.error.message || 'Unknown error'
      }, { status: 500 })
    }

    // Hem yeni hem eski API formatını destekle
    const reviews = data.reviews || data.result?.reviews || []
    const rating = data.rating || data.result?.rating || 0
    const totalRatings = data.userRatingCount || data.result?.user_ratings_total || 0

    // Debug: Tüm yorumların dil bilgilerini kontrol et
    console.log('=== DİL ANALİZİ ===')
    reviews.forEach((review: any, index: number) => {
      console.log(`Review ${index + 1}:`)
      console.log(`  - Rating: ${review.rating}`)
      console.log(`  - LanguageCode: ${review.languageCode}`)
      console.log(`  - Language: ${review.language}`)
      console.log(`  - Text LanguageCode: ${review.text?.languageCode}`)
      console.log(`  - Has Turkish LocalizedText: ${!!review.text?.localizedText?.tr}`)
      console.log(`  - Text Preview: ${review.text?.text?.substring(0, 50)}...`)
      console.log('---')
    })

    // Yeni API formatını eski formata dönüştür - sadece 4+ yıldızlı yorumları al
    const formattedReviews = reviews
      .filter((review: any) => (review.rating || 0) >= 4) // Sadece 4+ yıldızlı yorumları al
      .map((review: any) => {
        console.log('Processing review:', JSON.stringify(review, null, 2))
        
        // Yorum metnini al
        let reviewText = ''
        if (review.text?.text) {
          reviewText = review.text.text
        } else if (typeof review.text === 'string') {
          reviewText = review.text
        } else if (review.text?.localizedText) {
          // Türkçe metin varsa onu al, yoksa ilk metni al
          reviewText = review.text.localizedText.tr || 
                      review.text.localizedText.en || 
                      Object.values(review.text.localizedText)[0] || ''
        }

                 // Yazar adını al - Anonymous yerine daha iyi alternatifler
         let authorName = ''
         if (review.author?.name) {
           authorName = review.author.name
         } else if (review.author?.displayName) {
           authorName = review.author.displayName
         } else if (review.author_name) { // Eski API formatı için
           authorName = review.author_name
         } else {
           // Eğer hiç isim yoksa, yorum metninden veya zaman bilgisinden türet
           const timeStr = review.publishTime ? new Date(review.publishTime).toLocaleDateString('tr-TR') : 'Misafir'
           authorName = `Misafir ${timeStr}`
         }

                 // Profil fotoğrafını al - daha iyi fallback'ler
         let profilePhoto = ''
         if (review.author?.profilePhotoUri) {
           profilePhoto = review.author.profilePhotoUri
         } else if (review.author?.avatar) {
           profilePhoto = review.author.avatar
         } else if (review.profile_photo_url) { // Eski API formatı için
           profilePhoto = review.profile_photo_url
         } else {
           // Profil fotoğrafı yoksa boş bırak, component'te fallback avatar gösterilecek
           profilePhoto = ''
         }

         // Yorum resimlerini al
         let reviewImages: string[] = []
         if (review.photos && Array.isArray(review.photos)) {
           console.log(`Processing ${review.photos.length} photos for review`)
           reviewImages = review.photos.map((photo: any, photoIndex: number) => {
             console.log(`Photo ${photoIndex + 1}:`, JSON.stringify(photo, null, 2))
             
             if (photo.name) {
               // Yeni API formatı: photo.name'den URL oluştur
               const photoUrl = `https://places.googleapis.com/v1/${photo.name}/media?key=${apiKey}&maxHeightPx=400&maxWidthPx=400`
               console.log(`Generated photo URL (new API): ${photoUrl.replace(apiKey, '[API_KEY_HIDDEN]')}`)
               return photoUrl
             } else if (photo.photo_reference) {
               // Eski API formatı: photo_reference kullan
               const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${apiKey}`
               console.log(`Generated photo URL (legacy API): ${photoUrl.replace(apiKey, '[API_KEY_HIDDEN]')}`)
               return photoUrl
             } else if (typeof photo === 'string') {
               // Direkt URL
               console.log(`Direct photo URL: ${photo}`)
               return photo
             }
             console.log(`Skipping invalid photo:`, photo)
             return ''
           }).filter(Boolean)
         } else {
           console.log('No photos found for this review')
         }

        // Zaman bilgisini al
        let timeDescription = 'recently'
        if (review.relativePublishTimeDescription) {
          timeDescription = review.relativePublishTimeDescription
        } else if (review.publishTime) {
          const publishDate = new Date(review.publishTime)
          const now = new Date()
          const diffInDays = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24))
          
          if (diffInDays === 0) timeDescription = 'bugün'
          else if (diffInDays === 1) timeDescription = 'dün'
          else if (diffInDays < 7) timeDescription = `${diffInDays} gün önce`
          else if (diffInDays < 30) timeDescription = `${Math.floor(diffInDays / 7)} hafta önce`
          else if (diffInDays < 365) timeDescription = `${Math.floor(diffInDays / 30)} ay önce`
          else timeDescription = `${Math.floor(diffInDays / 365)} yıl önce`
        }

                 return {
           author_name: authorName,
           author_url: profilePhoto,
           language: review.language || 'tr',
           profile_photo_url: profilePhoto,
           rating: review.rating || 0,
           relative_time_description: timeDescription,
           text: reviewText,
           time: review.publishTime ? new Date(review.publishTime).getTime() / 1000 : Date.now() / 1000,
           review_url: `https://www.google.com/maps/place/?q=place_id:${placeId}&review=${review.time}`, // Yorum linki
           images: reviewImages // Yorum resimleri
         }
      })

    console.log(`✅ Successfully fetched ${reviews.length} total reviews, ${formattedReviews.length} formatted reviews (4+ stars only)`)
    console.log(`📊 Rating: ${rating}, Total Ratings: ${totalRatings}`)
    console.log(`📝 Note: Only showing reviews with 4+ stars`)
    console.log(`🖼️ Reviews with images: ${formattedReviews.filter((r: any) => r.images && r.images.length > 0).length}`)
    console.log(`📸 Total images found: ${formattedReviews.reduce((total: number, r: any) => total + (r.images?.length || 0), 0)}`)
    
    // Debug: Resimli yorumları detaylı logla
    formattedReviews.forEach((review: any, index: number) => {
      if (review.images && review.images.length > 0) {
        console.log(`📸 Review ${index + 1} (${review.author_name}) has ${review.images.length} images:`)
        review.images.forEach((img: string, imgIndex: number) => {
          console.log(`  Image ${imgIndex + 1}: ${img}`)
        })
      }
    })

    return NextResponse.json({
      reviews: formattedReviews,
      rating,
      totalRatings
    })

  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 