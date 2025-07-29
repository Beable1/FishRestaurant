"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8 lg:gap-8">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-300">Poyrazköy Balıkçısı</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Zarif bir sahil manzarasında en taze deniz ürünlerinin tadını çıkarın. Olağanüstü yemek deneyimi için öncelikli destinasyonunuz.
            </p>
          </div>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center mb-2 sm:mb-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-1.5 sm:mr-2" />
                <h4 className="font-semibold text-white text-sm sm:text-base">Konum</h4>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">
                Poyraz, Mendirek Yolu No:14
                <br />
                34829 Beykoz, Istanbul, Turkey
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center mb-2 sm:mb-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-1.5 sm:mr-2" />
                <h4 className="font-semibold text-white text-sm sm:text-base">İletişim</h4>
              </div>
              <div className="text-slate-300 text-xs sm:text-sm space-y-1">
                <p>Telefon: 0216 320 11 73</p>
                <p>Mobil: 0531 840 93 12</p>
                <div className="flex items-center mt-1 sm:mt-2">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>info@poyrazkoybalikcisi.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center mb-2 sm:mb-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-1.5 sm:mr-2" />
                <h4 className="font-semibold text-white text-sm sm:text-base">Çalışma Saatleri</h4>
              </div>
              <div className="text-slate-300 text-xs sm:text-sm space-y-1">
                <p>Pzt-Per: 17:00 - 22:00</p>
                <p>Cum-Cmt: 17:00 - 23:00</p>
                <p>Pazar: 16:00 - 21:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Google Maps */}
        <div className="mt-8 sm:mt-12">
          <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-300 text-center">Konumumuz</h4>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d96056.13997726813!2d29.049976939010865!3d41.20532833247781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x409fde73ea9020e1%3A0xa73b2e730d4524ad!2zUG95cmF6a8O2eSBCYWzEsWvDp8Sxc8SxLCBQb3lyYXosIE1lbmRpcmVrIFlvbHUsIEJleWtvei_EsHN0YW5idWw!3m2!1d41.2053577!2d29.132378499999998!4m5!1s0x409fde73ea9020e1%3A0xa73b2e730d4524ad!2sPoyrazk%C3%B6y%2C%20Mendirek%20Yolu%20No%3A14%2C%2034829%20Beykoz%2F%C4%B0stanbul!3m2!1d41.2053577!2d29.132378499999998!5e0!3m2!1str!2str!4v1753793498835!5m2!1str!2str" 
                className="w-full h-64 sm:h-80 md:h-96 rounded-lg border-2 border-slate-600"
                style={{border: 0}} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Social Media Buttons */}
        <div className="mt-8 sm:mt-12 text-center">
          <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-300">Bizi Takip Edin</h4>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => window.open('tel:02163201173', '_self')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Ara
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
              onClick={() => window.open('https://wa.me/905318409312', '_blank')}
            >
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white"
              onClick={() => window.open('https://instagram.com/poyrazkoybalikcisi/', '_blank')}
            >
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </Button>
          </div>
        </div>

        <div className="border-t border-slate-600 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-slate-400 text-xs sm:text-sm">
            © 2024 Poyrazköy Balıkçısı Restoranı. Tüm hakları saklıdır. |
            <span className="ml-1 sm:ml-2">Deniz ürünleri mükemmelliği için tutkuyla hazırlandı</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
