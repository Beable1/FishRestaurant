import { Carousel, featuredDishes, restaurantImages, customerTestimonials } from "./carousel"

export function FeaturedSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Featured Dishes Carousel */}
        <div className="mb-14 sm:mb-20 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-4 sm:mb-6">
              Öne Çıkan Yemekler
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Şefimizin imza yaratıları ve en popüler yemeklerini keşfedin
            </p>
          </div>
          <Carousel items={featuredDishes} autoPlay={true} autoPlayInterval={5000} />
        </div>

        {/* Restaurant Images Carousel */}
        <div className="mb-14 sm:mb-20 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-4 sm:mb-6">
              Restoranımız
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Güzel sahil konumumuzun sanal turunu yapın
            </p>
          </div>
          <Carousel items={restaurantImages} autoPlay={true} autoPlayInterval={6000} />
        </div>

        {/* Customer Testimonials Carousel */}
       
      </div>
    </section>
  )
}
