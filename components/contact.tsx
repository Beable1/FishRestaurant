import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Contact() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-blue-300">Poyrazköy Balıkçısı</h3>
            <p className="text-slate-300 leading-relaxed">
              Zarif bir sahil manzarasında en taze deniz ürünlerinin tadını çıkarın. Olağanüstü yemek deneyimi için öncelikli destinasyonunuz.
            </p>
          </div>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-semibold text-white">Konum</h4>
              </div>
              <p className="text-slate-300 text-sm">
                123 Harbor View Drive
                <br />
                Seaside Bay, CA 90210
                <br />
                Sahil Bölgesi
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-semibold text-white">İletişim</h4>
              </div>
              <div className="text-slate-300 text-sm space-y-1">
                <p>Telefon: (555) 123-FISH</p>
                <p>Faks: (555) 123-4567</p>
                <div className="flex items-center mt-2">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>info@poyrazkoybalikcisi.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-semibold text-white">Çalışma Saatleri</h4>
              </div>
              <div className="text-slate-300 text-sm space-y-1">
                <p>Pzt-Per: 17:00 - 22:00</p>
                <p>Cum-Cmt: 17:00 - 23:00</p>
                <p>Pazar: 16:00 - 21:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="border-t border-slate-600 mt-12 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 Poyrazköy Balıkçısı Restoranı. Tüm hakları saklıdır. |
            <span className="ml-2">Deniz ürünleri mükemmelliği için tutkuyla hazırlandı</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
