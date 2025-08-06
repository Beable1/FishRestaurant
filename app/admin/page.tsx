"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { auth, db, storage } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DishModal } from "@/components/admin/dish-modal"
import { GalleryModal } from "@/components/admin/gallery-modal"
import { ReservationModal } from "@/components/admin/reservation-modal"
import { 
  Lock, 
  LogOut, 
  Plus, 
  Upload, 
  Trash2, 
  Edit, 
  Eye, 
  Camera, 
  Utensils,
  Users,
  Settings,
  Shield,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Filter
} from "lucide-react"

interface Dish {
  id: string
  name: string
  description: string
  price: string
  category: string
  image: string
  popular: boolean
  createdAt: Date
}

interface GalleryImage {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  featured: boolean
  createdAt: Date
}

interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  section: string
  requests: string
  status: string
  createdAt: Date
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [dishes, setDishes] = useState<Dish[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showDishModal, setShowDishModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const router = useRouter()
  const [reservationStatus, setReservationStatus] = useState('all')
  const [reservationDate, setReservationDate] = useState('')
  const [reservationSection, setReservationSection] = useState('all')

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Load data when user is authenticated
  useEffect(() => {
    if (user) {
      loadDishes()
      loadGalleryImages()
      loadReservations()
    }
  }, [user])

  // Reload reservations when filters change
  useEffect(() => {
    if (user) {
      loadReservations({
        status: reservationStatus,
        date: reservationDate,
        section: reservationSection
      })
    }
    // eslint-disable-next-line
  }, [reservationStatus, reservationDate, reservationSection, user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      setLoginError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.")
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/admin")
    } catch (error) {
      console.error("Çıkış hatası:", error)
    }
  }

  const loadDishes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "dishes"))
      const dishesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Dish[]
      setDishes(dishesData)
    } catch (error) {
      console.error("Yemekler yüklenirken hata:", error)
    }
  }

  const loadGalleryImages = async () => {
    try {
      // Public klasörlerindeki resimleri yükle
      const dishesImages: GalleryImage[] = [
        {
          id: 'istavrit',
          title: 'İstavrit Balığı',
          description: 'Taze yakalanmış istavrit balığı, özel soslarla hazırlanmış',
          category: 'dishes',
          imageUrl: '/dishes/istavrit.jpg',
          featured: true,
          createdAt: new Date()
        },
        {
          id: 'kalkan',
          title: 'Kalkan Balığı',
          description: 'Denizin incisi kalkan balığı, geleneksel tariflerle',
          category: 'dishes',
          imageUrl: '/dishes/kalkan.jpg',
          featured: true,
          createdAt: new Date()
        },
        {
          id: 'minakop',
          title: 'Minakop Balığı',
          description: 'Taze minakop balığı, özel pişirme teknikleriyle',
          category: 'dishes',
          imageUrl: '/dishes/minakop.png',
          featured: false,
          createdAt: new Date()
        }
      ]

      const outdoorImages: GalleryImage[] = [
        {
          id: 'dis-mekan1',
          title: 'Dış Mekan',
          description: 'Deniz manzaralı dış mekanımızda keyifli anlar',
          category: 'outdoor',
          imageUrl: '/outdoor/DısMekan1.jpg',
          featured: true,
          createdAt: new Date()
        },
        {
          id: 'dis-mekan2',
          title: 'Açık Hava',
          description: 'Temiz hava ve deniz esintisi eşliğinde yemek keyfi',
          category: 'outdoor',
          imageUrl: '/outdoor/DısMekan2.jpg',
          featured: false,
          createdAt: new Date()
        },
        {
          id: 'dis-mekan3',
          title: 'Teras',
          description: 'Geniş terasımızda unutulmaz anlar yaşayın',
          category: 'outdoor',
          imageUrl: '/outdoor/DısMekan3.jpg',
          featured: false,
          createdAt: new Date()
        }
      ]

      const allImages = [...dishesImages, ...outdoorImages]
      setGalleryImages(allImages)
    } catch (error) {
      console.error("Galeri resimleri yüklenirken hata:", error)
    }
  }

  const loadReservations = async (filters?: { status?: string, date?: string, section?: string }) => {
    try {
      let url = '/api/admin/reservations?'
      if (filters?.status && filters.status !== 'all') url += `status=${filters.status}&`
      if (filters?.date) url += `date=${filters.date}&`
      if (filters?.section && filters.section !== 'all') url += `section=${filters.section}&`
      const response = await fetch(url)
      const data = await response.json()
      if (data.reservations) {
        setReservations(data.reservations)
      }
    } catch (error) {
      console.error("Rezervasyonlar yüklenirken hata:", error)
    }
  }

  const handleSaveDish = async (dishData: any) => {
    try {
      if (selectedDish) {
        // Update existing dish
        await updateDoc(doc(db, "dishes", selectedDish.id), dishData)
      } else {
        // Add new dish
        await addDoc(collection(db, "dishes"), {
          ...dishData,
          createdAt: new Date()
        })
      }
      await loadDishes()
    } catch (error) {
      console.error("Yemek kaydedilirken hata:", error)
      throw error
    }
  }

  const handleSaveGalleryImage = async (imageData: any) => {
    try {
      // Public klasörlerindeki resimler için sadece bilgileri güncelle
      // Gerçek dosya yönetimi için manuel olarak public klasörüne dosya eklenmeli
      console.log('Gallery image data:', imageData)
      alert('Resim bilgileri güncellendi. Yeni resim eklemek için dosyayı public klasörüne manuel olarak ekleyin.')
      await loadGalleryImages()
    } catch (error) {
      console.error("Resim kaydedilirken hata:", error)
      throw error
    }
  }

  const handleDeleteDish = async (dishId: string) => {
    if (confirm("Bu yemeği silmek istediğinizden emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "dishes", dishId))
        await loadDishes()
      } catch (error) {
        console.error("Yemek silinirken hata:", error)
      }
    }
  }

  const handleDeleteGalleryImage = async (imageId: string) => {
    if (confirm("Bu resmi silmek istediğinizden emin misiniz? (Dosya public klasöründen manuel olarak silinmeli)")) {
      try {
        console.log('Deleting gallery image:', imageId)
        alert('Resim bilgileri silindi. Dosyayı public klasöründen manuel olarak silin.')
        await loadGalleryImages()
      } catch (error) {
        console.error("Resim silinirken hata:", error)
      }
    }
  }

  const handleSaveReservation = async (reservationData: any) => {
    try {
      const response = await fetch('/api/admin/reservations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      })
      
      if (response.ok) {
        await loadReservations()
      } else {
        throw new Error('Rezervasyon güncellenemedi')
      }
    } catch (error) {
      console.error("Rezervasyon kaydedilirken hata:", error)
      throw error
    }
  }

  const handleDeleteReservation = async (reservationId: string) => {
    if (confirm("Bu rezervasyonu silmek istediğinizden emin misiniz?")) {
      try {
        const response = await fetch(`/api/admin/reservations?id=${reservationId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          await loadReservations()
        } else {
          throw new Error('Rezervasyon silinemedi')
        }
      } catch (error) {
        console.error("Rezervasyon silinirken hata:", error)
      }
    }
  }

  const openDishModal = (dish?: Dish) => {
    setSelectedDish(dish || null)
    setShowDishModal(true)
  }

  const openGalleryModal = (image?: GalleryImage) => {
    setSelectedImage(image || null)
    setShowGalleryModal(true)
  }

  const closeDishModal = () => {
    setShowDishModal(false)
    setSelectedDish(null)
  }

  const closeGalleryModal = () => {
    setShowGalleryModal(false)
    setSelectedImage(null)
  }

  const openReservationModal = (reservation?: Reservation) => {
    setSelectedReservation(reservation || null)
    setShowReservationModal(true)
  }

  const closeReservationModal = () => {
    setShowReservationModal(false)
    setSelectedReservation(null)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Login form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-8 w-8 mr-2" />
              <CardTitle className="text-2xl">Admin Paneli</CardTitle>
            </div>
            <p className="text-blue-100">Giriş yapın</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  E-posta
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="••••••••"
                />
              </div>
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {loginError}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 text-lg font-semibold shadow-lg"
              >
                <Lock className="mr-2 h-5 w-5" />
                Giriş Yap
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Paneli</h1>
                <p className="text-slate-600 text-sm">Hoş geldiniz, {user.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Genel Bakış</span>
            </TabsTrigger>
            <TabsTrigger value="dishes" className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span className="hidden sm:inline">Yemekler</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Galeri</span>
            </TabsTrigger>
            <TabsTrigger value="reservations" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Rezervasyonlar</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Ayarlar</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Toplam Yemek</p>
                      <p className="text-3xl font-bold text-slate-800">{dishes.length}</p>
                    </div>
                    <Utensils className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Galeri Resimleri</p>
                      <p className="text-3xl font-bold text-slate-800">{galleryImages.length}</p>
                    </div>
                    <Camera className="h-8 w-8 text-teal-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Toplam Rezervasyon</p>
                      <p className="text-3xl font-bold text-slate-800">{reservations.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Bekleyen Rezervasyon</p>
                      <p className="text-3xl font-bold text-slate-800">
                        {reservations.filter(r => r.status === 'pending').length}
                      </p>
                    </div>
                    <Badge className="bg-yellow-500 text-white">Beklemede</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Utensils className="mr-2 h-5 w-5" />
                    Son Eklenen Yemekler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dishes.slice(0, 5).map((dish) => (
                      <div key={dish.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{dish.name}</p>
                          <p className="text-sm text-slate-600">{dish.category}</p>
                        </div>
                        <Badge variant="outline">{dish.price}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="mr-2 h-5 w-5" />
                    Son Eklenen Resimler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {galleryImages.slice(0, 5).map((image) => (
                      <div key={image.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{image.title}</p>
                          <p className="text-sm text-slate-600">{image.category}</p>
                        </div>
                        {image.featured && <Badge className="bg-orange-500">Öne Çıkan</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Son Rezervasyonlar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reservations.slice(0, 5).map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{reservation.name}</p>
                          <p className="text-sm text-slate-600">
                            {reservation.date} - {reservation.time}
                          </p>
                        </div>
                        <Badge 
                          className={
                            reservation.status === 'confirmed' ? 'bg-green-500' :
                            reservation.status === 'pending' ? 'bg-yellow-500' :
                            reservation.status === 'cancelled' ? 'bg-red-500' :
                            'bg-blue-500'
                          }
                        >
                          {reservation.status === 'confirmed' ? 'Onaylandı' :
                           reservation.status === 'pending' ? 'Beklemede' :
                           reservation.status === 'cancelled' ? 'İptal' :
                           'Tamamlandı'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dishes Tab */}
          <TabsContent value="dishes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Yemek Yönetimi</h2>
              <Button 
                onClick={() => openDishModal()}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Yeni Yemek Ekle
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map((dish) => (
                <Card key={dish.id} className="border-0 shadow-lg">
                  <div className="relative">
                    <img
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {dish.popular && (
                      <Badge className="absolute top-3 right-3 bg-orange-500">
                        Popüler
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-800">{dish.name}</h3>
                      <span className="text-lg font-bold text-blue-600">{dish.price}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{dish.category}</Badge>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openDishModal(dish)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-300"
                          onClick={() => handleDeleteDish(dish.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Galeri Yönetimi</h2>
              <Button 
                onClick={() => openGalleryModal()}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                <Upload className="mr-2 h-4 w-4" />
                Resim Yükle
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <Card key={image.id} className="border-0 shadow-lg">
                  <div className="relative">
                    <img
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {image.featured && (
                      <Badge className="absolute top-3 right-3 bg-orange-500">
                        Öne Çıkan
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-800 mb-2">{image.title}</h3>
                    <p className="text-slate-600 text-sm mb-3">{image.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{image.category}</Badge>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openGalleryModal(image)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-300"
                          onClick={() => handleDeleteGalleryImage(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
              <h2 className="text-2xl font-bold text-slate-800">Rezervasyon Yönetimi</h2>
              <div className="flex flex-wrap gap-2 items-end">
                {/* Status Filter */}
                <div>
                  <Label className="text-slate-700 text-sm">Durum</Label>
                  <Select value={reservationStatus} onValueChange={setReservationStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Hepsi</SelectItem>
                      <SelectItem value="pending">Beklemede</SelectItem>
                      <SelectItem value="confirmed">Onaylandı</SelectItem>
                      <SelectItem value="cancelled">İptal Edildi</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Section Filter */}
                <div>
                  <Label className="text-slate-700 text-sm">Bölüm</Label>
                  <Select value={reservationSection} onValueChange={setReservationSection}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Hepsi</SelectItem>
                      <SelectItem value="indoor">İç Mekan</SelectItem>
                      <SelectItem value="outdoor">Dış Mekan</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Date Filter */}
                <div>
                  <Label className="text-slate-700 text-sm">Tarih</Label>
                  <Input
                    type="date"
                    value={reservationDate}
                    onChange={e => setReservationDate(e.target.value)}
                    className="w-36"
                  />
                </div>
                {/* Clear Filters Button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setReservationStatus('all');
                    setReservationDate('');
                    setReservationSection('all');
                  }}
                  className="h-10"
                >
                  <Filter className="h-4 w-4 mr-1" /> Temizle
                </Button>
                {/* Manual Refresh */}
                <Button 
                  variant="outline"
                  onClick={() => loadReservations({
                    status: reservationStatus,
                    date: reservationDate,
                    section: reservationSection
                  })}
                  className="h-10"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Yenile
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {reservations.map((reservation) => (
                <Card key={reservation.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-slate-800 text-lg">{reservation.name}</h3>
                          <Badge 
                            className={
                              reservation.status === 'confirmed' ? 'bg-green-500' :
                              reservation.status === 'pending' ? 'bg-yellow-500' :
                              reservation.status === 'cancelled' ? 'bg-red-500' :
                              'bg-blue-500'
                            }
                          >
                            {reservation.status === 'confirmed' ? 'Onaylandı' :
                             reservation.status === 'pending' ? 'Beklemede' :
                             reservation.status === 'cancelled' ? 'İptal Edildi' :
                             'Tamamlandı'}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-700">
                              {reservation.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-700">
                              {reservation.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-700">{reservation.guests} kişi</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-700">
                              {reservation.section === 'indoor' ? 'İç Mekan' :
                               reservation.section === 'outdoor' ? 'Dış Mekan' : 'Bar'}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-700">{reservation.email}</span>
                          </div>
                          {reservation.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-slate-500" />
                              <span className="text-slate-700">{reservation.phone}</span>
                            </div>
                          )}
                          {reservation.requests && (
                            <div className="mt-2 p-2 bg-slate-50 rounded-lg">
                              <p className="text-sm text-slate-600">
                                <span className="font-medium">Özel İstekler:</span> {reservation.requests}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openReservationModal(reservation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-300"
                          onClick={() => handleDeleteReservation(reservation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {reservations.length === 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Henüz Rezervasyon Yok</h3>
                    <p className="text-slate-500">Henüz hiç rezervasyon yapılmamış.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Hesap Ayarları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-slate-700 font-medium">E-posta</Label>
                  <Input value={user.email || ""} disabled className="mt-1" />
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Kullanıcı ID</Label>
                  <Input value={user.uid} disabled className="mt-1" />
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Son Giriş</Label>
                  <Input 
                    value={user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString('tr-TR') : ""} 
                    disabled 
                    className="mt-1" 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <DishModal
        isOpen={showDishModal}
        onClose={closeDishModal}
        dish={selectedDish}
        onSave={handleSaveDish}
      />

      <GalleryModal
        isOpen={showGalleryModal}
        onClose={closeGalleryModal}
        image={selectedImage}
        onSave={handleSaveGalleryImage}
      />

      <ReservationModal
        isOpen={showReservationModal}
        onClose={closeReservationModal}
        reservation={selectedReservation}
        onSave={handleSaveReservation}
      />
    </div>
  )
} 