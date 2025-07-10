import { Card, CardContent } from "@/components/ui/card"
import { Waves, Award, Clock } from "lucide-react"

export function About() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Hikayemiz</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            1992 yılında Martinez ailesi tarafından kurulan Okyanus'un Avı, basit bir misyonla küçük bir sahil restoranı olarak başladı: okyanusun en değerli hazinelerini doğrudan masanıza getirmek. Tutku projesi olarak başlayan bu girişim, her yemeğin geleneğin, kalitenin ve denize saygının hikayesini anlattığı bölgenin en sevilen deniz ürünleri destinasyonuna dönüştü.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-8 pb-6">
              <Waves className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Okyanustan Masaya</h3>
              <p className="text-slate-600">
                En taze avın masanıza hasat edildikten saatler içinde ulaşmasını sağlamak için doğrudan yerel balıkçılarla ve sürdürülebilir tedarikçilerle ortaklık kuruyoruz.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-8 pb-6">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Mutfak Mükemmelliği</h3>
              <p className="text-slate-600">
                Şef yönetimindeki mutfağımız, zamanın testinden geçmiş teknikleri yenilikçi lezzetlerle birleştirerek, denizin bolluğunu kutlayan unutulmaz yemek deneyimleri yaratıyor.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-8 pb-6">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Aile Mirası</h3>
              <p className="text-slate-600">
                Martinez ailesinin üç nesli, misafirperverlik, kalite ve her misafir için sıcak bir atmosfer yaratma konusundaki kuruluş değerlerimizi sürdürmeye devam ediyor.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
