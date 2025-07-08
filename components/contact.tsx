import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Contact() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-blue-300">Ocean's Catch</h3>
            <p className="text-slate-300 leading-relaxed">
              Experience the finest fresh seafood in an elegant waterfront setting. Your premier destination for
              exceptional dining.
            </p>
          </div>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-semibold text-white">Location</h4>
              </div>
              <p className="text-slate-300 text-sm">
                123 Harbor View Drive
                <br />
                Seaside Bay, CA 90210
                <br />
                Waterfront District
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-semibold text-white">Contact</h4>
              </div>
              <div className="text-slate-300 text-sm space-y-1">
                <p>Phone: (555) 123-FISH</p>
                <p>Fax: (555) 123-4567</p>
                <div className="flex items-center mt-2">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>info@oceanscatch.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-semibold text-white">Hours</h4>
              </div>
              <div className="text-slate-300 text-sm space-y-1">
                <p>Mon-Thu: 5:00 PM - 10:00 PM</p>
                <p>Fri-Sat: 5:00 PM - 11:00 PM</p>
                <p>Sunday: 4:00 PM - 9:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="border-t border-slate-600 mt-12 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 Ocean's Catch Restaurant. All rights reserved. |
            <span className="ml-2">Crafted with passion for seafood excellence</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
