import { Carousel, featuredDishes, restaurantImages, customerTestimonials } from "./carousel"

export function FeaturedSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Featured Dishes Carousel */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Featured Dishes
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover our chef's signature creations and most popular dishes
            </p>
          </div>
          <Carousel items={featuredDishes} autoPlay={true} autoPlayInterval={5000} />
        </div>

        {/* Restaurant Images Carousel */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Our Restaurant
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Take a virtual tour of our beautiful waterfront location
            </p>
          </div>
          <Carousel items={restaurantImages} autoPlay={true} autoPlayInterval={6000} />
        </div>

        {/* Customer Testimonials Carousel */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              What Our Guests Say
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Read reviews from our satisfied customers</p>
          </div>
          <Carousel items={customerTestimonials} autoPlay={true} autoPlayInterval={7000} />
        </div>
      </div>
    </section>
  )
}
