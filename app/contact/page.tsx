import { Header } from "@/components/header"
import { Contact } from "@/components/contact"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Map } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "İletişim",
  description: "Poyrazköy Balıkçısı iletişim bilgileri - Adres, telefon, email, çalışma saatleri ve rezervasyon bilgileri. Bize ulaşın, sorularınızı yanıtlayalım.",
  keywords: ["iletişim", "rezervasyon", "telefon", "adres", "çalışma saatleri", "konum", "ulaşım"],
  openGraph: {
    title: "İletişim - Poyrazköy Balıkçısı",
    description: "Adres, telefon, email, çalışma saatleri ve rezervasyon bilgileri. Bize ulaşın, sorularınızı yanıtlayalım.",
  }
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              İletişime Geçin
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Sorularınız mı var? Özel istekleriniz mi? Biz buradayız ve sizi dinlemeye hazırız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center text-blue-200">
                <Phone className="h-5 w-5 mr-2" />
                <span className="text-lg">0216 320 11 73</span>
              </div>
              <div className="flex items-center justify-center text-blue-200">
                <Mail className="h-5 w-5 mr-2" />
                <span className="text-lg">poyrazkoybalikcisi@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Mesaj Gönderin
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-slate-700 font-medium">
                        Ad *
                      </Label>
                      <Input
                        id="firstName"
                        required
                        className="mt-1"
                        placeholder="Adınız"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-slate-700 font-medium">
                        Soyad *
                      </Label>
                      <Input
                        id="lastName"
                        required
                        className="mt-1"
                        placeholder="Soyadınız"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        E-posta *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="mt-1"
                        placeholder="ornek@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-slate-700 font-medium">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-slate-700 font-medium">
                      Konu *
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Konu seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reservation">Rezervasyon Sorgusu</SelectItem>
                        <SelectItem value="menu">Menü Hakkında</SelectItem>
                        <SelectItem value="events">Özel Etkinlikler</SelectItem>
                        <SelectItem value="feedback">Geri Bildirim</SelectItem>
                        <SelectItem value="partnership">İş Ortaklığı</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-slate-700 font-medium">
                      Mesajınız *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      className="mt-1"
                      rows={6}
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 text-lg font-semibold shadow-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Mesaj Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Location Card */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
                  <CardTitle className="text-xl flex items-center">
                    <MapPin className="mr-3 h-5 w-5" />
                    Konumumuz
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-slate-700 font-medium">Poyrazköy Balıkçısı</p>
                    <p className="text-slate-600 text-sm">
                      Poyraz, Mendirek Yolu No:14<br />
                      34829 Beykoz, Istanbul, Turkey
                    </p>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        <Map className="mr-2 h-4 w-4" />
                        Haritada Göster
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps */}
              <div className="w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d96056.13997726813!2d29.049976939010865!3d41.20532833247781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x409fde73ea9020e1%3A0xa73b2e730d4524ad!2zUG95cmF6a8O2eSBCYWzEsWvDp8Sxc8SxLCBQb3lyYXosIE1lbmRpcmVrIFlvbHUsIEJleWtvei_EsHN0YW5idWw!3m2!1d41.2053577!2d29.132378499999998!4m5!1s0x409fde73ea9020e1%3A0xa73b2e730d4524ad!2sPoyrazk%C3%B6y%2C%20Mendirek%20Yolu%20No%3A14%2C%2034829%20Beykoz%2F%C4%B0stanbul!3m2!1d41.2053577!2d29.132378499999998!5e0!3m2!1str!2str!4v1753793498835!5m2!1str!2str" 
                  className="w-full h-64 sm:h-80 md:h-96 rounded-lg border-2 border-slate-300 shadow-lg"
                  style={{border:0}} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Hours Card */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <CardTitle className="text-xl flex items-center">
                    <Clock className="mr-3 h-5 w-5" />
                    Çalışma Saatleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Pazartesi - Perşembe</span>
                      <span className="text-slate-600">17:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Cuma - Cumartesi</span>
                      <span className="text-slate-600">17:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Pazar</span>
                      <span className="text-slate-600">16:00 - 21:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Methods Card */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <CardTitle className="text-xl flex items-center">
                    <Phone className="mr-3 h-5 w-5" />
                    İletişim Yöntemleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Telefon</p>
                        <p className="text-slate-600 text-sm">0216 320 11 73</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Mobil</p>
                        <p className="text-slate-600 text-sm">0531 840 93 12</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">E-posta</p>
                        <p className="text-slate-600 text-sm">poyrazkoybalikcisi@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Sık Sorulan Sorular
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              En çok sorulan soruların cevaplarını burada bulabilirsiniz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Rezervasyon Yapabilir miyim?</h3>
                <p className="text-slate-600">
                  Evet, telefon, e-posta veya web sitemiz üzerinden rezervasyon yapabilirsiniz. Büyük gruplar için önceden arama yapmanızı öneririz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Özel etkinlikler düzenleyebilir misiniz?</h3>
                <p className="text-slate-600">
                  Evet, düğün, kurumsal etkinlikler ve özel kutlamalar için özel menüler ve mekan düzenlemeleri sunuyoruz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Parking imkanınız var mı?</h3>
                <p className="text-slate-600">
                  Evet, restoranımızda ücretsiz parking alanı bulunmaktadır. Ayrıca yakın çevrede de parking seçenekleri mevcuttur.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Alerjik durumlar için özel menü var mı?</h3>
                <p className="text-slate-600">
                  Evet, alerjik durumlar için özel menü seçenekleri sunuyoruz. Lütfen rezervasyon sırasında belirtin.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Çocuk menüsü var mı?</h3>
                <p className="text-slate-600">
                  Evet, çocuklar için özel menü seçeneklerimiz bulunmaktadır. Ayrıca çocuk sandalyesi de sağlıyoruz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Hangi ödeme yöntemlerini kabul ediyorsunuz?</h3>
                <p className="text-slate-600">
                  Nakit, kredi kartı, banka kartı ve mobil ödeme yöntemlerini kabul ediyoruz. Ayrıca online rezervasyon için güvenli ödeme sistemi kullanıyoruz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  )
} 