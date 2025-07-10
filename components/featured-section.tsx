import { Carousel, featuredDishes, restaurantImages, customerTestimonials } from "./carousel"

export function FeaturedSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Featured Dishes Carousel */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Öne Çıkan Yemekler
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Şefimizin imza yaratıları ve en popüler yemeklerini keşfedin
            </p>
          </div>
          <Carousel items={featuredDishes} autoPlay={true} autoPlayInterval={5000} />
        </div>

        {/* Restaurant Images Carousel */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Restoranımız
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Güzel sahil konumumuzun sanal turunu yapın
            </p>
          </div>
          <Carousel items={restaurantImages} autoPlay={true} autoPlayInterval={6000} />
        </div>

        {/* Customer Testimonials Carousel */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Misafirlerimiz Ne Diyor
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Memnun müşterilerimizin yorumlarını okuyun</p>
          </div>
          <Carousel items={customerTestimonials} autoPlay={true} autoPlayInterval={7000} />
        </div>
      </div>
    </section>
  )
}
