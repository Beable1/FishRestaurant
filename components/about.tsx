import { Card, CardContent } from "@/components/ui/card"
import { Waves, Award, Clock } from "lucide-react"

export function About() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Our Story</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Founded in 1992 by the Martinez family, Ocean's Catch began as a small waterfront eatery with a simple
            mission: to bring the ocean's finest treasures directly to your table. What started as a passion project has
            grown into the region's most beloved seafood destination, where every dish tells a story of tradition,
            quality, and respect for the sea.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-8 pb-6">
              <Waves className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Ocean to Table</h3>
              <p className="text-slate-600">
                We partner directly with local fishermen and sustainable suppliers to ensure the freshest catch arrives
                at your table within hours of being harvested.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-8 pb-6">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Culinary Excellence</h3>
              <p className="text-slate-600">
                Our chef-driven kitchen combines time-honored techniques with innovative flavors, creating memorable
                dining experiences that celebrate the sea's bounty.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-8 pb-6">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Family Legacy</h3>
              <p className="text-slate-600">
                Three generations of the Martinez family continue to uphold our founding values of hospitality, quality,
                and creating a welcoming atmosphere for every guest.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
