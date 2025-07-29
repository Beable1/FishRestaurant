import { Card, CardContent } from "@/components/ui/card"
import { Waves, Award, Clock } from "lucide-react"

export function About() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">Hakkımızda</h2>
          <div className="text-base xs:text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed space-y-6">
            <p>
              İstanbul'un Karadeniz'e açılan kapısı Poyrazköy'de, eşsiz manzara ve taptaze deniz ürünleriyle uzun yıllardır hizmet veren Poyrazköy Balıkçısı, köklü geçmişi ve kalitesiyle bölgenin en sevilen mekânlarından biridir.
            </p>
            <p>
              Denizin kıyısında konumlanan işletmemiz, yıllar içinde kazandığı tecrübe ve misafir memnuniyeti odaklı hizmet anlayışıyla, balık ve deniz mahsullerinde güvenilir bir adres olmuştur. Her biri ustalıkla hazırlanan lezzetlerimizde, günlük olarak temin edilen taze ürünler kullanılır ve geleneksel tarifler modern sunumlarla buluşturulur.
            </p>
            <p>
              Zengin menümüz, sadece balık çeşitleriyle değil, özenle hazırlanan mezelerimiz, deniz ürünlü spesiyallerimiz ve yöresel tatlarımızla da fark yaratır. Mevsimine göre hazırlanan seçeneklerimiz, damaklarda iz bırakan bir deneyim sunar.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
              <Waves className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-800">Eşsiz Konum</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Denize sıfır konumumuzun sunduğu eşsiz Karadeniz manzarası, keyifli sofralara unutulmaz bir atmosfer katar. İster gündüzün ferahlatıcı deniz esintisiyle, ister akşam gün batımında romantik bir fonda.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
              <Award className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-800">Kalite ve Lezzet</h3>
              <p className="text-slate-600 text-sm sm:text-base">
              Poyrazköy Balıkçısı, kaliteyi ve misafirperverliği her zaman ön planda tutarak, lezzet ve manzarayı bir araya getiren köklü bir işletme olarak sizleri ağırlamaktan mutluluk duyar.
           </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
              <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-800">Köklü Tecrübe</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Uzun yıllardır Poyrazköy'de hizmet veren işletmemiz, yıllar içinde kazandığı tecrübe ve misafir memnuniyeti odaklı hizmet anlayışıyla güvenilir bir adres olmuştur.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 sm:p-8 border border-blue-200 max-w-4xl mx-auto">
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
              Geniş kapasitemiz ile hem bireysel misafirlerimizi hem de grup organizasyonlarını ağırlayabilir, özel günlerinizde size ve sevdiklerinize şık ve huzurlu bir ortam sunarız.
            </p>
          
          </div>
        </div>
      </div>
    </section>
  )
}
