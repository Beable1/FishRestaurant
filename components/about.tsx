import { Card, CardContent } from "@/components/ui/card"
import { Waves, Award, Clock } from "lucide-react"

export function About() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">Hikayemiz</h2>
          <p className="text-base xs:text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            1992 yılında Martinez ailesi tarafından kurulan Okyanus'un Avı, basit bir misyonla küçük bir sahil restoranı olarak başladı: okyanusun en değerli hazinelerini doğrudan masanıza getirmek. Tutku projesi olarak başlayan bu girişim, her yemeğin geleneğin, kalitenin ve denize saygının hikayesini anlattığı bölgenin en sevilen deniz ürünleri destinasyonuna dönüştü.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
              <Waves className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-800">Okyanustan Masaya</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                En taze avın masanıza hasat edildikten saatler içinde ulaşmasını sağlamak için doğrudan yerel balıkçılarla ve sürdürülebilir tedarikçilerle ortaklık kuruyoruz.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
              <Award className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-800">Mutfak Mükemmelliği</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Şef yönetimindeki mutfağımız, zamanın testinden geçmiş teknikleri yenilikçi lezzetlerle birleştirerek, denizin bolluğunu kutlayan unutulmaz yemek deneyimleri yaratıyor.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
              <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-800">Aile Mirası</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Martinez ailesinin üç nesli, misafirperverlik, kalite ve her misafir için sıcak bir atmosfer yaratma konusundaki kuruluş değerlerimizi sürdürmeye devam ediyor.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
